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
  const [cardHolderName, setCardHolderName] = useState("");
  const [cardHolderNameError, setCardHolderNameError] = useState(false);
  const [cardError, setCardError] = useState(false);
  const [collapsableContentShowing, setCollapsableContentShowing] = useState(false);
  const [cardInputHasErrors, setCardInputHasErrors] = useState(false);
  const [collapsableContentMaxHeight, setCollapsableContentMaxHeight] = useState(
    window.document.body.clientWidth > 450 ? 75 : 55
  );
  const [errors, setErrors] = useState([]);
  const [customerData, setCustomerData] = useState({});
  const [submitting, setSubmitting] = useState(false);
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

      // const baseHeight = 295;
      const baseHeight = window.document.body.clientWidth > 450 ? 295 : 275;
      const errorsHeight = errors.length * 26;

      setCollapsableContentMaxHeight(baseHeight + errorsHeight)
    }
  }, [errors, collapsableContentShowing])

  const handleAddPaymentMethod = async ev => {
    ev.preventDefault();
    setSubmitting(true);
    if (!cardInputHasErrors) {
      setCardError(false);
      setCardHolderNameError(false);
      const errors = [];
      const { setupIntent, error } = await stripe.confirmCardSetup(
        customerData.setup_secret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              name: cardHolderName
            }
          }
        }
      );

      if (cardHolderName.length === 0) {
        errors.push(setCardHolderNameError)
      }

      if (error) {
        errors.push(setCardError)
      }

      if (errors.length > 0) {
        setErrors(errors);

        errors.map((err, idx) => {
          setTimeout(() => {
            return err(true);
          }, 40 * idx)
        });
      } else {
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
      }
    }
    
    setSubmitting(false)
  };

  const handleChange = (ev) => {
    console.log(ev)
    if (ev.empty && !cardInputHasErrors) {
      setCardInputHasErrors({
        message: 'The field above is required'
      })
    } else if (!ev.empty && ev.error === undefined && cardInputHasErrors) {
      setCardInputHasErrors(false)
    } else if (ev.error && !cardInputHasErrors) {
      setCardInputHasErrors(ev.error);
    }
  }

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
            border: `${cardHolderNameError && cardHolderName.length === 0 ? "1px solid #FF0000" : "1px solid #CCC"}`,
            borderRadius: "5px"
          }}
          type="text"
          className="checkout-input"
          value={cardHolderName}
          placeholder="Card holder name"
          onChange={e => setCardHolderName(e.target.value)}
        />

        {
          cardHolderNameError && cardHolderName.length === 0 ? (
            <div style={{ paddingTop: "10px", color: "#FF0000", textAlign: "center", fontSize: "13px" }}>
              The field above is required
            </div>
          ) : null
        }
      </div>

      <div
        // id="tester"
        // className="testeringtest"
        style={{
          marginTop: "20px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}
      >

        <div
          style={{
            border: `${cardError && cardInputHasErrors ? "1px solid #FF0000" : "1px solid #CCC"}`,
            width: "100%",
            borderRadius: "5px",
            backgroundColor: "#fbfbfb",
          }}
        >
          <CardElement
            options={cardElementOptions}
            onChange={(ev) => handleChange(ev)}
          />
        </div>

        {
          cardError || cardInputHasErrors ? (
            <div style={{ paddingTop: "10px", color: "#FF0000", textAlign: "center", fontSize: "13px" }}>
              {cardInputHasErrors.message}
            </div>
          ) : null
        }
      </div>

      <div style={{ marginTop: "20px" }}>
       {
         submitting ? (
          <button
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
          Submitting...
        </button>
         ) : (
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
         )
       }
      </div>
    </div>
  )
}