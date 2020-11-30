import React, { useState, useEffect } from 'react'
import firebase from 'firebase'
import {
  CardElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";

export default (props) => {
  const [cardholderName, setCardholderName] = useState("");
  const [collapsableContentShowing, setCollapsableContentShowing] = useState(false);
  const [collapsableContentMaxHeight, setCollapsableContentMaxHeight] = useState(62);
  const el2 = window.document.getElementById('add-payment-rotating-thinger-1')
  const el3 = window.document.getElementById('add-payment-rotating-thinger-2')
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    if (!collapsableContentShowing) {
      if (el2 !== null && el3 !== null && el3.classList.contains('rotating-plus-minus-rotated-tester-1')) {
        el3.classList.toggle('rotating-plus-minus-rotated-tester-1')
        el2.classList.toggle('rotating-plus-minus-rotated-tester')
      }

      setCollapsableContentMaxHeight(62);
    } else {
      if (el2 !== null && el3 !== null && !el3.classList.contains('rotating-plus-minus-rotated-tester-1')) {
        el3.classList.toggle('rotating-plus-minus-rotated-tester-1')
        el2.classList.toggle('rotating-plus-minus-rotated-tester')
      }

      setCollapsableContentMaxHeight(277)
    }
  }, [collapsableContentShowing])

  const handleAddPaymentMethod = async ev => {
    ev.preventDefault();

    const { setupIntent, error } = await stripe.confirmCardSetup(
      props.customerData.setup_secret,
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
        height: "100%",
        maxHeight: `${collapsableContentMaxHeight}px`,
        overflow: "hidden",
        paddingBottom: "40px",
        borderBottom: "1px solid #CCC",
        width: "100%",
        transition: "max-height 0.7s"
      }}
    >
      <div
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
        <div className="shipping-toggle-header">Add a payment method</div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            width: "12px"
          }}
        >
          <div
            id="add-payment-rotating-thinger-1"
            className="rotating-thing-1"
            style={{
              top: "-11px",
              position: "absolute",
              transform: "rotate(90deg)",
              transition: "0.7s"
            }}
          >
            |
          </div>

          <div
            id="add-payment-rotating-thinger-2"
            className="rotating-thing-2"
            style={{
              left: "2px",
              top: "-10px",
              position: "absolute",
              transform: "rotate(180deg)",
              width: "5px",
              transition: "0.7s"
            }}
          >
            |
          </div>
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