import React, { useState, useEffect } from 'react'
import firebase from 'firebase'
import 'firebase/firestore'
import {
  CardElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default (props) => {
  const [cardholderName, setCardholderName] = useState("");
  const [collapsableContentShowing, setCollapsableContentShowing] = useState(false);
  const [collapsableContentMaxHeight, setCollapsableContentMaxHeight] = useState(
    window.document.body.clientWidth > 450 ? 75 : 55
  );
  const [customerData, setCustomerData] = useState({});
  const el2 = window.document.getElementById('add-payment-payment-chevron')
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    if (firebase.auth().currentUser.uid) {
      firebase.firestore()
        .collection("stripe_customers")
        .doc(firebase.auth().currentUser.uid)
        .get()
        .then(resp => {
          setCustomerData(resp.data());
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [])

  useEffect(() => {
    if (!collapsableContentShowing && props.resizeObsMaxHeightReAlignment !== collapsableContentMaxHeight) {
      // console.log(props.resizeObsMaxHeightReAlignment)
      setCollapsableContentMaxHeight(props.resizeObsMaxHeightReAlignment)
    }
  }, [props.resizeObsMaxHeightReAlignment])

  useEffect(() => {
    if (!collapsableContentShowing) {
      if (el2 !== null && el2.classList.contains('chevron-rotated')) {
        el2.classList.toggle('chevron-rotated')
      }

      setCollapsableContentMaxHeight(
        window.document.body.clientWidth > 450 ? 75 : 55
      );
    } else {
      if (el2 !== null && !el2.classList.contains('chevron-rotated')) {
        el2.classList.toggle('chevron-rotated')
      }

      setCollapsableContentMaxHeight(277)
    }
  }, [collapsableContentShowing])

  const handleAddPaymentMethod = async ev => {
    ev.preventDefault();

    const { setupIntent, error } = await stripe.confirmCardSetup(
      customerData.setup_secret,
      {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: cardholderName
          }
        }
      }
    );

    if (error) {
      console.log(error);
      return;
    }

    firebase
      .firestore()
      .collection("stripe_customers")
      .doc(firebase.auth().currentUser.uid)
      .collection("payment_methods")
      .add({ id: setupIntent.payment_method })
      .then(resp => {
        resp.onSnapshot(
          {
            // Listen for document metadata changes
            includeMetadataChanges: true
          },
          doc => {
            if (doc.data().card) {
              if (props.noPaymentMethods) {
                props.setNoPaymentMethods(false);
              }

              const currentState = props.paymentMethods;
              currentState.push(doc.data());
              props.setPaymentMethods([...currentState]);
            }
          }
        );
      });
  };

  

  const cardElementOptions = {
    hidePostalCode: true,
    style: {
      base: {   
        '::placeholder': {
          color: "#7c7979",
          fontSize: `${window.document.body.clientWidth > 450 ? "14px" : "13px"}`,
          letterSpacing: "0.75px"
        }
      }
    }
  };

  return (
    <div
      id="checkout-add-payment-wrapper"
      style={{
        marginTop: "40px",
        paddingBottom: "40px",
        height: "100%",
        maxHeight: `${collapsableContentMaxHeight}px`,
        overflow: "hidden",
        borderBottom: "1px solid #CCC",
        width: "100%",
        transition: "max-height 0.7s"
      }}
    >
      <div
        className="add-payment-method-wrapper"
        onClick={() => setCollapsableContentShowing(!collapsableContentShowing)} 
        style={{
          cursor: "pointer",
          fontSize: "18px",
          padding: "0px 20px",
          paddingBottom: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        <div className="add-payment-header" style={{ letterSpacing: "0.75px", height: "35px", width: "calc(100% - 40px)", display: "flex", alignItems: "center" }}>
          Add a payment method
        </div>

        <div
          id="add-payment-payment-chevron"
          className="add-payment-payment-chevron"
          style={{
            transition: "transform 0.7s"
          }}
        >
          <FontAwesomeIcon icon={["fas", "chevron-down"]} />
        </div>
      </div>

      <div>
        <input
          style={{
            height: "45px",
            width: "100%",
            border: "1px solid #CCC",
            borderRadius: "5px"
          }}
          type="text"
          className="checkout-input"
          value={cardholderName}
          placeholder="Card holder name"
          onChange={e => setCardholderName(e.target.value)}
        />
      </div>

      <div
        // id="tester"
        // className="testeringtest"
        style={{
          marginTop: "20px",
          height: "45px",
          width: "100%",
          border: "1px solid #CCC",
          backgroundColor: "#fbfbfb",
          borderRadius: "5px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <CardElement options={cardElementOptions} />
      </div>

      <div style={{ marginTop: "20px" }}>
        <button
          onClick={handleAddPaymentMethod}
          style={{
            padding: "0 2rem",
            height: "45px",
            border: "none",
            backgroundColor: "#1c1b1b",
            color: "#fff",
            borderRadius: "5px",
            cursor: "pointer",
            width: "100%"
          }}
        >
          Add this card
        </button>
      </div>
    </div>
  )
}