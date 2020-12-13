import React, { useEffect, useState, useContext } from "react";
import CartContext from "../../Contexts/CartContext";
import { Link, Redirect } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "firebase/auth";
import firebase from "firebase/app";
import "firebase/functions";
import {
  useStripe
} from "@stripe/react-stripe-js";
import OrderSummary from "./OrderSummary";
import AddShippingAddressForm from "./AddShippingAddressForm";
import AddPaymentMethodForm from "./AddPaymentMethodForm";
import ChoosePaymentMethod from "./ChoosePaymentMethod";
import ChooseShippingAddress from "./ChooseShippingAddress";
import ExpressCheckoutPaymentForms from "./ExpressCheckoutPaymentForms";
import ContactInfoForm from "./ContactInfoForm";
// import axios from 'axios'

export default () => {
  // TODO Add Free Shipping Logic On Orders Over $100
  // Todo Add Logic To Add Discount
  // TODO Remove Create Account Component and create an account simultaniously when creating an order
  const [email, setEmail] = useState("");
  
  
  const [phone, setPhone] = useState("");
  const [subtotal, setSubtotal] = useState(0);
  const [billingAddresses, setBillingAddresses] = useState([]);
  const [billingAddress, setBillingAddress] = useState(false);
  
  const [noBillingAddresses, setNoBillingAddresses] = useState(false);
  const [userUID, setUserUID] = useState("");
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState(false);
  const [noBillingAddressSelected, setNoBillingAddressSelected] = useState(
    false
  );
  const [noPaymentMethodSelected, setNoPaymentMethodSelected] = useState(false);
  const [noEmail, setNoEmail] = useState(false);
  const [noPhoneNumber, setNoPhoneNumber] = useState(false);
  const [noPaymentMethods, setNoPaymentMethods] = useState(false);
  const [discount, setDiscount] = useState("");
  const [activeDiscount, setActiveDiscount] = useState(false);
  const stripe = useStripe();
  const [ orderSummaryHidden, setOrderSummaryHidden ] = useState(true)
  const [ testerState, setTesterState ] = useState(false)
  const [ collapsableOrderSummaryOpen, setCollapsableOrderSummaryOpen ] = useState(false);
  const [ collapsableOrderSummaryMaxHeight, setCollapsableOrderSummaryMaxHeight ] = useState(101);
  const [ collapsedFormsMaxHeight, setCollapsedFormsMaxHeight ] = useState(
    window.document.body.clientWidth > 450 ? 75 : 55
  )
  let timeout = false;

  const { products } = useContext(CartContext);

  if (products.length < 1) {
    return <Redirect to="/" />;
  }

  useEffect(() => {
    const rootElement = document.getElementById("app-container");
    const navbarElement = document.getElementById("navbar-wrapper-id");

    rootElement.classList.toggle("no-scroll-margin");
    navbarElement.classList.toggle("hidden-nav");

    rootElement.scrollIntoView(
      {
        behavior: "smooth",
        block: "start"
      },
      500
    );

    if (userUID.length === 0) {
      setUserUID(firebase.auth().currentUser.uid);
    }

    const subtotal = products.reduce((accum, currentVal) => {
      return (accum += currentVal[4].quantity * currentVal[0].product.price);
    }, 0);

    setSubtotal(subtotal);
  }, [products]);

  const resize_ob = new ResizeObserver(function(entries) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      if (window.document.body.clientWidth > 450 && collapsedFormsMaxHeight !== 75) {
        setCollapsedFormsMaxHeight(75)
      } else if (window.document.body.clientWidth <= 450 && collapsedFormsMaxHeight !== 55) {
        setCollapsedFormsMaxHeight(55)
      }
    }, 500);
    // console.log('hit this')
  });
  
  useEffect(() => {
    // start observing for resize
    if (window.document.getElementById('checkout-options-seperator-wrapper') !== null) {
      resize_ob.observe(window.document.getElementById('checkout-options-seperator-wrapper'))
    }
  }, [collapsedFormsMaxHeight])

  // Handle card actions like 3D Secure
  async function handleCardAction(payment, docId) {
    const { error, paymentIntent } = await stripe.handleCardAction(
      payment.client_secret
    );
    if (error) {
      alert(error.message);
      payment = error.payment_intent;
    } else if (paymentIntent) {
      payment = paymentIntent;
    }

    await firebase
      .firestore()
      .collection("stripe_customers")
      .doc(userUID)
      .collection("payments")
      .doc(docId)
      .set(payment, { merge: true });
  }

  const handleCheckoutPurchase = async ev => {
    ev.preventDefault();

    const errors = [];
    if (!billingAddress) {
      errors.push(setNoBillingAddressSelected);
    }

    if (!paymentMethod) {
      errors.push(setNoPaymentMethodSelected);
    }

    if (email.length === 0) {
      errors.push(setNoEmail);
    }

    if (phone.length === 0) {
      errors.push(setNoPhoneNumber);
    }

    if (errors.length > 0) {
      errors.map(err => {
        return err(true);
      });
    } else {
      const shippingDetails = {
        name: billingAddress.name,
        address: {
          line1: billingAddress.address.line1,
          line2: billingAddress.address.line2,
          postal_code: billingAddress.address.postal_code,
          city: billingAddress.address.city,
          state: billingAddress.address.state,
          country: billingAddress.address.country.split(",")[1]
        }
      };

      let test = [];
      products.map(product => {
        const productId = product[0].product.id;
        const productPrice = product[0].product.price;
        const title = product[0].product.title;
        const quantity = product[4].quantity;
        const productColor = product[2].color;
        const productSize = product[1].size;
        test.push({
          productId,
          title,
          productPrice,
          quantity,
          productColor,
          productSize
        });
      });

      const data = {
        payment_method: paymentMethod,
        currency: "usd",
        status: "new",
        shipping_details: shippingDetails,
        products: test,
        contact_info: {
          email,
          phone
        },
        discount: activeDiscount,
        expressCheckoutPurchase: false,
        user: firebase.auth().currentUser.uid
      };

      firebase
        .firestore()
        .collection("stripe_customers")
        .doc(userUID)
        .collection("payments")
        .add(data)
        .then(docRef => {
          docRef.onSnapshot(snapshot => {
            const data = snapshot.data();

            if (data.status === "succeeded") {
              //IF SUCCESS PUSH TO PURCHASE DASHBOARD
            } else if (data.status === "requires_action") {
              handleCardAction(data, docRef.id);
            } else if (data.error) {
              alert(data.error);
            }
          });
        })
        .catch(err => {
          alert(err);
        });
    }
  };

  const handleAddDiscountClick = () => {
    let deconstructedProducts = [];
    products.map(product => {
      const productId = product[0].product.id;
      const productPrice = product[0].product.price;
      const title = product[0].product.title;
      const quantity = product[4].quantity;
      const productColor = product[2].color;
      const productSize = product[1].size;
      return deconstructedProducts.push({
        productId,
        title,
        productPrice,
        quantity,
        productColor,
        productSize
      });
    });

    const data = {
      discount: discount.toUpperCase(),
      user: firebase.auth().currentUser.uid,
      products: deconstructedProducts
    };

    if (discount.length > 0) {
      const checkAndApplyDiscount = firebase
        .functions()
        .httpsCallable("discountBeingApplied");
      checkAndApplyDiscount(data)
        .then(async result => {
          const { usable, error } = result.data;

          if (usable) {
            setTesterState(true)
            setActiveDiscount(result.data);
          } else {
            console.log(error);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  };
  
    const handleCollapsableOrderSummaryClick = () => {
    setCollapsableOrderSummaryOpen(!collapsableOrderSummaryOpen)
  }

  useEffect(() => {
    const el4 = document.getElementById("order-summary-rotating-chevron")
      if (!collapsableOrderSummaryOpen) {
        if (el4 !== null && el4.classList.contains("chevron-rotated")) {
          el4.classList.toggle("chevron-rotated")
          setOrderSummaryHidden(!orderSummaryHidden)
        }
        setCollapsableOrderSummaryMaxHeight(101)
      } else {
        let mobileDiscountHeight = window.document.body.clientWidth <= 450 ? 65 : 0 
        const newMaxHeight = (mobileDiscountHeight + 440.5) + (products.length * 181);
        if (el4 !== null && !el4.classList.contains("chevron-rotated")) {
          el4.classList.toggle("chevron-rotated")
          setOrderSummaryHidden(!orderSummaryHidden)
        }
        setCollapsableOrderSummaryMaxHeight(newMaxHeight)
      }
  }, [ collapsableOrderSummaryOpen ])

  return (
    <div className="checkout-container" id="checkout-container">
      <div className="checkout-banner-image-wrapper" style={{ maxHeight: "200px" }}>
        <img
          className="checkout-banner-image"
          src="https://via.placeholder.com/1900x646"
          alt="bannerImage"
        />
      </div>

      <div className="checkout-wrapper">
        {
          window.document.body.clientWidth <= 1024 ? (
            <div
              id="checkout-order-summary-collapsable-container"
              className="checkout-order-summary-collapsable-container"
              // id="checkout-shipping-methods-wrapper"
              // className="checkout-shipping-methods-wrapper"
              style={{
                height: "100%",
                maxHeight: `${collapsableOrderSummaryMaxHeight}px`,
                // marginTop: "40px",
                overflow: "hidden",
                padding: "40px 0px",
                // paddingTop: "20px",
                // paddingBottom: "20px",
                // borderTop: "1px solid #CCC",
                borderBottom: "1px solid #CCC",
                width: "100%",
                transition: "max-height 0.7s"
              }}
              >
              <div
                onClick={handleCollapsableOrderSummaryClick}
                className="checkout-collapsable-order-summary-header-wrapper"
                style={{
                  cursor: "pointer",
                  fontSize: "18px",
                  padding: "0px 20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between"
                }}
              >
                <div style={{ display: "flex" }}>
                  <FontAwesomeIcon icon={["fas", "shopping-cart"]} />

                  <div className="checkout-collapsable-order-summary-heading" style={{ paddingLeft: "20px", display: "flex", alignItems: "center" }}>
                    {
                      orderSummaryHidden ? (
                        "Show order summary"
                      ) : (
                        "Hide order summary"
                      )
                    }
                    
                    <div style={{ marginLeft: "10px", display: "flex", transition: "transform 0.7s" }} id="order-summary-rotating-chevron" className="order-summary-rotating-chevron">
                     <FontAwesomeIcon icon={["fas", "chevron-down"]} />
                    </div>
                  </div>
                </div>

                <div style={{ fontWeight: "500" }}>
                  ${subtotal}
                </div>
              </div>

              <OrderSummary products={products} setDiscount={setDiscount} handleAddDiscountClick={handleAddDiscountClick} subtotal={subtotal} activeDiscount={activeDiscount} includeShipping={false} />
            </div>
          ) : null
        }

        <div className="checkout-left-column">
          <ExpressCheckoutPaymentForms
            activeDiscount={activeDiscount}
            subtotal={subtotal}
          />

          <div
            id="checkout-options-seperator-wrapper"
            className="checkout-options-seperator-wrapper"
          >
            <span className="checkout-options-seperator-border"></span>
            <span className="checkout-options-seperator-header">OR</span>
            <span className="checkout-options-seperator-border"></span>
          </div>

          <AddShippingAddressForm
            noBillingAddresses={noBillingAddresses}
            setNoBillingAddresses={(val) => setNoBillingAddresses(val)}
            billingAddresses={billingAddresses}
            setBillingAddresses={(val) => setBillingAddresses(val)}
            resizeObsMaxHeightReAlignment={collapsedFormsMaxHeight}
          />

          <AddPaymentMethodForm 
            noPaymentMethods={noPaymentMethods}
            setNoPaymentMethods={(val) => setNoPaymentMethods(val)}
            paymentMethods={paymentMethods}
            setPaymentMethods={(val) => setPaymentMethods(val)}
            resizeObsMaxHeightReAlignment={collapsedFormsMaxHeight}
          />

          <div
            className="checkout-form-component-padding"
            style={{ paddingTop: "40px" }}
          >
            <ChooseShippingAddress
              setNoBillingAddressSelected={(val) => setNoBillingAddressSelected(val)}
              billingAddresses={billingAddresses}
              setBillingAddresses={(val) => setBillingAddresses(val)}
              setBillingAddress={(val) => setBillingAddress(val)}
              noBillingAddressSelected={noBillingAddressSelected}
              noBillingAddresses={noBillingAddresses}
              billingAddress={billingAddress}
            />
          </div>

          <div
            className="checkout-form-component-padding"
            style={{ paddingTop: "40px" }}
          >
            <ChoosePaymentMethod
              noPaymentMethods={noPaymentMethods}
              setNoPaymentMethods={(val) => setNoPaymentMethods(val)}
              paymentMethods={paymentMethods}
              setPaymentMethods={(val) => setPaymentMethods(val)}
              setPaymentMethod={(val) => setPaymentMethod(val)}
              paymentMethod={paymentMethod}
              noPaymentMethods={noPaymentMethods}
              noPaymentMethodSelected={noPaymentMethodSelected}

            />
          </div>

          <ContactInfoForm
            noEmail={noEmail}
            noPhoneNumber={noPhoneNumber}
            email={email}
            phone={phone}
            setEmail={(val) => setEmail(val)}
            setPhone={(val) => setPhone(val)}
          />

          <div className="checkout-left-column-btns-wrapper">
            <Link
              className="checkout-left-column-left-link"
              to="/"
              onClick={() => {
                const rootElement = document.getElementById("app-container");
                const navbarElement = document.getElementById(
                  "navbar-wrapper-id"
                );

                rootElement.classList.toggle("no-scroll-margin");
                navbarElement.classList.toggle("hidden-nav");
              }}
            >
              <span className="checkout-left-column-link-icon">
                <FontAwesomeIcon icon="arrow-left" />
              </span>{" "}
              Return to home
            </Link>

            <div>
              <button
                className="checkout-left-column-right-link"
                to="/checkout/payment"
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  height: "45px",
                  padding: "0 2rem",
                  border: "none",
                  cursor: "pointer"
                }}
                onClick={handleCheckoutPurchase}
                // disabled={stripe}
              >
                <div>Purchase</div>
              </button>
            </div>
          </div>
        </div>

        {
          window.document.body.clientWidth > 1024 ? (
            <OrderSummary products={products} setDiscount={setDiscount} handleAddDiscountClick={handleAddDiscountClick} subtotal={subtotal} activeDiscount={activeDiscount} includeShipping={true} />
          ) : null
        }
      </div>
    </div>
  );
};
