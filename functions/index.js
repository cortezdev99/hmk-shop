const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { Logging } = require("@google-cloud/logging");
const logging = new Logging({
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID
});

admin.initializeApp(functions.config().firebase);

const stripe = require("stripe")(functions.config().stripe.testkey);

exports.createStripeCustomer = functions.auth.user().onCreate(async user => {
  const customer = await stripe.customers.create({ email: user.email });
  const intent = await stripe.setupIntents.create({
    customer: customer.id
  });
  await admin
    .firestore()
    .collection("stripe_customers")
    .doc(user.uid)
    .set({
      customer_id: customer.id,
      setup_secret: intent.client_secret
    });
  return;
});

exports.addPaymentMethodDetails = functions.firestore
  .document("/stripe_customers/{userId}/payment_methods/{pushId}")
  .onCreate(async (snap, context) => {
    try {
      const paymentMethodId = snap.data().id;
      const paymentMethod = await stripe.paymentMethods.retrieve(
        paymentMethodId
      );
      await snap.ref.set(paymentMethod);
      // Create a new SetupIntent so the customer can add a new method next time.
      const intent = await stripe.setupIntents.create({
        customer: paymentMethod.customer
      });
      await snap.ref.parent.parent.set(
        {
          setup_secret: intent.client_secret
        },
        { merge: true }
      );
      return;
    } catch (error) {
      await snap.ref.set({ error: userFacingMessage(error) }, { merge: true });
      await reportError(error, { user: context.params.userId });
    }
  });

exports.createStripePayment = functions.firestore
  .document("stripe_customers/{userId}/payments/{pushId}")
  .onCreate(async (snap, context) => {
    const {
      products,
      currency,
      payment_method,
      shipping_details,
      user,
      contact_info,
      expressCheckoutPurchase,
      discount
    } = snap.data();
    if (expressCheckoutPurchase) {
      await admin
        .firestore()
        .collection("payments")
        .doc(user)
        .collection("processing")
        .doc(snap.ref.id)
        .set({
          customer: user,
          purchaseId: snap.ref.id,
          payment_method,
          shipping_details,
          products,
          contact_info
        });
    } else {
      functions.logger.log(
        "HELLO FROM CREATE STRIPE PAYMENT",
        discount,
        discount.discount
      );
      const amount = products.reduce((accum, currentVal) => {
        return (accum += currentVal.productPrice * currentVal.quantity);
      }, 0);

      let shipping_amount = amount < 100 ? 6 : 0;
      let total;

      if (discount.usable) {
        await admin
          .firestore()
          .collection("discounts")
          .doc(discount.discount)
          .get()
          .then(async snapshot => {
            if (snapshot.exists) {
              const { discount_amount } = snapshot.data();
              total =
                amount +
                shipping_amount -
                (amount + shipping_amount) * (discount_amount / 100);
            } else {
              total = amount + shipping_amount;
            }
          });
      } else {
        total = amount + shipping_amount;
      }

      try {
        // Look up the Stripe customer id.
        const customer = (await snap.ref.parent.parent.get()).data()
          .customer_id;
        // Create a charge using the pushId as the idempotency key
        // to protect against double charges.
        const idempotencyKey = context.params.pushId;
        const payment = await stripe.paymentIntents.create(
          {
            amount: Math.floor(total * 100),
            currency,
            customer,
            payment_method,
            off_session: false,
            confirm: true,
            confirmation_method: "manual"
          },
          { idempotencyKey }
        );
        // If the result is successful, write it back to the database.
        await snap.ref.set({
          payment,
          purchased_products: products
        });

        await admin
          .firestore()
          .collection("payments")
          .doc(user)
          .collection("processing")
          .doc(snap.ref.id)
          .set({
            customer: user,
            purchaseId: snap.ref.id,
            payment,
            shipping_details,
            products,
            contact_info
          });
      } catch (error) {
        // We want to capture errors and render them in a user-friendly way, while
        // still logging an exception with StackDriver
        await snap.ref.set(
          { error: userFacingMessage(error) },
          { merge: true }
        );
        await reportError(error, { user: context.params.userId });
      }
    }
  });

/**
 * When 3D Secure is performed, we need to reconfirm the payment
 * after authentication has been performed.
 *
 * @see https://stripe.com/docs/payments/accept-a-payment-synchronously#web-confirm-payment
 */
exports.confirmStripePayment = functions.firestore
  .document("stripe_customers/{userId}/payments/{pushId}")
  .onUpdate(async (change, context) => {
    if (change.after.data().status === "requires_confirmation") {
      const payment = await stripe.paymentIntents.confirm(
        change.after.data().id
      );
      change.after.ref.set(payment);
    }
  });

exports.createExpressCheckoutPaymentIntent = functions.https.onCall(
  async (data, context) => {
    const products = data.products;

    const amount = products.reduce((accum, currentVal) => {
      return (accum += currentVal.productPrice * currentVal.quantity);
    }, 0);

    const total = amount < 100 ? amount + 6 : amount;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.floor(total * 100),
      currency: "usd",
      // Verify your integration in this guide by including this parameter
      metadata: { integration_check: "accept_a_payment" }
    });

    return paymentIntent;
  }
);

exports.discountBeingApplied = functions.https.onCall(async (data, context) => {
  const discount = data.discount;
  const userUID = data.user;
  const products = data.products;
  const amount = products.reduce((accum, currentVal) => {
    return (accum += currentVal.productPrice * currentVal.quantity);
  }, 0);
  const shipping_cost = amount < 100 ? 6 : 0;

  let result;

  await admin
    .firestore()
    .collection("discounts")
    .doc(discount)
    .get()
    .then(async snapshot => {
      if (snapshot.exists) {
        const {
          uses_per_user,
          discount_amount,
          displayable_discount
        } = snapshot.data();

        await admin
          .firestore()
          .collection("stripe_customers")
          .doc(userUID)
          .collection("used_discounts")
          .doc(discount)
          .get()
          .then(snap => {
            if (snap.exists) {
              const { times_used } = snap.data();

              if (times_used < uses_per_user) {
                if (displayable_discount === "BOGO") {
                } else {
                  let discount_amount_total =
                    (amount + shipping_cost) * (discount_amount / 100);

                  result = {
                    discount,
                    numeral_discount: discount_amount,
                    usable: true,
                    discount_amount: discount_amount_total,
                    displayable_discount
                  };
                }
              } else {
                result = {
                  usable: false,
                  error: "Discount usage exceeded. "
                };
              }
            } else {
              if (displayable_discount === "BOGO") {
              } else {
                let discount_amount_total =
                  (amount + shipping_cost) * (discount_amount / 100);

                result = {
                  discount,
                  usable: true,
                  discount_amount: discount_amount_total,
                  displayable_discount
                };
              }
            }
          });
      } else {
        result = {
          usable: false,
          error: "Discount does not exist."
        };
      }
    });

  return result;
});

function reportError(err, context = {}) {
  // This is the name of the StackDriver log stream that will receive the log
  // entry. This name can be any valid log stream name, but must contain "err"
  // in order for the error to be picked up by StackDriver Error Reporting.
  const logName = "errors";
  const log = logging.log(logName);

  // https://cloud.google.com/logging/docs/api/ref_v2beta1/rest/v2beta1/MonitoredResource
  const metadata = {
    resource: {
      type: "cloud_function",
      labels: { function_name: process.env.FUNCTION_NAME }
    }
  };

  // https://cloud.google.com/error-reporting/reference/rest/v1beta1/ErrorEvent
  const errorEvent = {
    message: err.stack,
    serviceContext: {
      service: process.env.FUNCTION_NAME,
      resourceType: "cloud_function"
    },
    context: context
  };

  // Write the error log entry
  return new Promise((resolve, reject) => {
    log.write(log.entry(metadata, errorEvent), error => {
      if (error) {
        return reject(error);
      }
      return resolve();
    });
  });
}

// [END reporterror]

/**
 * Sanitize the error message for the user.
 */
function userFacingMessage(error) {
  return error.type
    ? error.message
    : "An error occurred, developers have been alerted";
}
