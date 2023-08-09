import React, { useState, useEffect, useContext } from "react";
import PaypalBtn from "../paypal/PaypalBtn";
import CartContext from "../../Contexts/CartContext";
import {
  useStripe,
  PaymentRequestButtonElement,
} from "@stripe/react-stripe-js";
import { auth, db } from "../../Config/firebase";
import { addDoc, collection } from "firebase/firestore";
import { httpsCallable } from "firebase/functions";

export default (props) => {
  const [paymentRequest, setPaymentRequest] = useState(null);
  const [
    expressCheckoutPaymentSubmitting,
    setExpressCheckoutPaymentSubmitting,
  ] = useState(false);
  const stripe = useStripe();
  const { products } = useContext(CartContext);

  const handleSuccessfulPayPalPayment = async (ev) => {
    const shippingDetails = {
      name: ev.purchase_units[0].shipping.name.full_name,
      address: {
        line1: ev.purchase_units[0].shipping.address.address_line_1,
        postal_code: ev.purchase_units[0].shipping.address.postal_code,
        city: ev.purchase_units[0].shipping.address.admin_area_2,
        state: ev.purchase_units[0].shipping.address.admin_area_1,
        country: ev.purchase_units[0].shipping.address.country_code,
      },
    };

    let expressCheckoutPurchasedProducts = [];
    products.map((product) => {
      const productId = product[0].product.id;
      const productPrice = product[0].product.price;
      const title = product[0].product.title;
      const quantity = product[4].quantity;
      const productColor = product[2].color;
      const productSize = product[1].size;
      expressCheckoutPurchasedProducts.push({
        productId,
        title,
        productPrice,
        quantity,
        productColor,
        productSize,
      });
    });

    const data = {
      payment_method: ev.purchase_units[0].payments.captures[0].id,
      currency: "usd",
      status: "new",
      shipping_details: shippingDetails,
      products: expressCheckoutPurchasedProducts,
      contact_info: {
        email: ev.payer.email_address,
        phone: "",
      },
      expressCheckoutPurchase: true,
      user: auth.currentUser.uid,
    };

    addDoc(db, "stripe_customers", auth.currentUser.uid, "payments").then(
      (docRef) => {
        //////////////
        //// TODO ////
        // SUCCESS PUSH TO DASHBOARD
        console.log("SUCCESS PUSH TO DASHBOARD");
      }
    );
  };

  useEffect(() => {
    if (paymentRequest && !expressCheckoutPaymentSubmitting) {
      paymentRequest.on("token", async (ev) => {
        setExpressCheckoutPaymentSubmitting(true);
        let test = [];
        products.map((product) => {
          const productId = product[0].product.id;
          const productPrice = product[0].product.price;
          const title = product[0].product.title;
          const quantity = product[4].quantity;
          const productColor = product[2].color;
          const productSize = product[1].size;
          return test.push({
            productId,
            title,
            productPrice,
            quantity,
            productColor,
            productSize,
          });
        });

        const data = {
          products: test,
          discount: props.activeDiscount,
        };

        const createExpressCheckoutPaymentIntent = httpsCallable(
          "createExpressCheckoutPaymentIntent"
        );
        const result = await createExpressCheckoutPaymentIntent(data);

        const { paymentIntent, error: confirmError } =
          await stripe.confirmCardPayment(result.data.client_secret, {
            payment_method: {
              type: "card",
              card: {
                token: ev.token.id,
              },
            },
          });

        if (confirmError) {
          /////////////////
          // TODO /////////
          // Report to the browser that the payment failed, prompting it to
          // re-show the payment interface, or show an error message and close
          // the payment interface.
          ev.complete("fail");
        } else {
          ev.complete("success");

          if (paymentIntent.status === "requires_action") {
            const { error } = await stripe.confirmCardPayment(
              result.data.client_secret
            );

            if (error) {
              ///////////////
              //// TODO /////
              // The payment failed -- ask your customer for a new payment method.
            } else {
              const shippingDetails = {
                name: ev.payerName,
                address: {
                  line1: ev.shippingAddress.addressLine,
                  postal_code: ev.shippingAddress.postalCode,
                  city: ev.shippingAddress.city,
                  state: ev.shippingAddress.region,
                  country: ev.shippingAddress.country,
                },
              };

              let expressCheckoutPurchasedProducts = [];
              products.map((product) => {
                const productId = product[0].product.id;
                const productPrice = product[0].product.price;
                const title = product[0].product.title;
                const quantity = product[4].quantity;
                const productColor = product[2].color;
                const productSize = product[1].size;
                expressCheckoutPurchasedProducts.push({
                  productId,
                  title,
                  productPrice,
                  quantity,
                  productColor,
                  productSize,
                });
              });

              const data = {
                payment_method: paymentIntent,
                currency: "usd",
                status: "new",
                shipping_details: shippingDetails,
                products: expressCheckoutPurchasedProducts,
                contact_info: {
                  email: ev.payerEmail,
                  phone: ev.payerPhone,
                },
                expressCheckoutPurchase: true,
                user: auth.currentUser.uid,
              };

              addDoc(db, "stripe_customers", auth.currentUser.uid, "payments")
                .then((docRef) => {
                  // The payment has succeeded.
                  // SUCCESS PUSH TO DASHBOARD
                  console.log("SUCCESS PUSH TO DASHBOARD");
                })
                .catch((err) => {
                  alert(err);
                });
            }
          } else {
            const shippingDetails = {
              name: ev.payerName,
              address: {
                line1: ev.shippingAddress.addressLine,
                postal_code: ev.shippingAddress.postalCode,
                city: ev.shippingAddress.city,
                state: ev.shippingAddress.region,
                country: ev.shippingAddress.country,
              },
            };

            let expressCheckoutPurchasedProducts = [];
            products.map((product) => {
              const productId = product[0].product.id;
              const productPrice = product[0].product.price;
              const title = product[0].product.title;
              const quantity = product[4].quantity;
              const productColor = product[2].color;
              const productSize = product[1].size;
              expressCheckoutPurchasedProducts.push({
                productId,
                title,
                productPrice,
                quantity,
                productColor,
                productSize,
              });
            });

            const data = {
              payment_method: paymentIntent,
              currency: "usd",
              status: "new",
              shipping_details: shippingDetails,
              products: expressCheckoutPurchasedProducts,
              contact_info: {
                email: ev.payerEmail,
                phone: ev.payerPhone,
              },
              expressCheckoutPurchase: true,
              user: auth.currentUser.uid,
            };

            const collectionRef = collection(
              db,
              "stripe_customers",
              auth.currentUser.uid,
              "payments"
            );

            addDoc(db, collectionRef, data)
              .then((docRef) => {
                //////////////
                //// TODO ////
                // SUCCESS PUSH TO DASHBOARD
                console.log("SUCCESS PUSH TO DASHBOARD");
              })
              .catch((err) => {
                alert(err);
              });
          }
        }
        setExpressCheckoutPaymentSubmitting(false);
      });
    }
  }, [
    props.activeDiscount,
    stripe,
    expressCheckoutPaymentSubmitting,
    setExpressCheckoutPaymentSubmitting,
  ]);

  useEffect(() => {
    if (paymentRequest) {
      paymentRequest.on("shippingaddresschange", (ev) => {
        ev.updateWith({
          status: "success",
        });
      });
    }
  }, [stripe, paymentRequest]);

  useEffect(() => {
    if (stripe) {
      let productObjectsToDisplayInCheckout = [];

      products.map((product) => {
        const productPrice = product[0].product.price;
        const title = product[0].product.title;
        const quantity = product[4].quantity;

        return productObjectsToDisplayInCheckout.push({
          amount: productPrice * quantity * 100,
          label: title,
        });
      });

      const expressCheckoutSubtotal = products.reduce((accum, currentVal) => {
        return (accum += currentVal[4].quantity * currentVal[0].product.price);
      }, 0);

      const shippingOptions =
        expressCheckoutSubtotal < 100
          ? [
              {
                id: "standard-shipping",
                label: "Standard shipping",
                detail: "Arrives in 5 to 7 days",
                amount: 600,
              },
            ]
          : [
              {
                id: "free-shipping",
                label: "Free shipping",
                detail: "Arrives in 5 to 7 days",
                amount: 0,
              },
            ];

      const paymentRequest = stripe.paymentRequest({
        country: "US",
        currency: "usd",
        total: {
          label: "Purchase total",
          amount:
            expressCheckoutSubtotal < 100
              ? (expressCheckoutSubtotal + 6) * 100
              : expressCheckoutSubtotal * 100,
        },
        displayItems: productObjectsToDisplayInCheckout,
        requestPayerName: true,
        requestPayerEmail: true,
        requestShipping: true,
        shippingOptions: shippingOptions,
      });

      paymentRequest.canMakePayment().then((result) => {
        if (result) {
          setPaymentRequest(paymentRequest);
        }
      });
    }
  }, [stripe]);

  return (
    <div className="checkout-express-checkout-wrapper">
      <div className="checkout-express-checkout-header-wrapper">
        <span className="checkout-express-checkout-header-border checkout-express-checkout-header-border-left"></span>
        <span className="checkout-express-checkout-header">
          Express Checkout
        </span>
        <span className="checkout-express-checkout-header-border checkout-express-checkout-header-border-right"></span>
      </div>

      <div className="checkout-express-checkout-btns-wrapper">
        {paymentRequest ? (
          <div className="checkout-express-checkout-btn-wrapper">
            <PaymentRequestButtonElement
              options={{ paymentRequest }}
              id="checkout-payment-request-button-element"
            />
          </div>
        ) : null}

        <div className="checkout-express-checkout-btn-wrapper checkout-express-checkout-btn-wrapper-paypal">
          <PaypalBtn
            options={{
              disableFunding: "credit,card,venmo",
              clientId:
                "Ad5t87C5PSZBkusJGq_zTh83uFWQDc9-FPzrxh13HNVTqgCAy6vYA76v4DkjrBeWFNxnI2pOXaMDcTEx",
            }}
            amount={props.subtotal < 100 ? props.subtotal + 6 : props.subtotal}
            currency={"USD"}
            onSuccess={(ev) => handleSuccessfulPayPalPayment(ev)}
          />
        </div>
      </div>
    </div>
  );
};
