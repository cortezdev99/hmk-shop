import React, { useState, useEffect } from 'react'
import firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/functions'
import {
  CardElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MoreInfoIcon from '../Utilities/MoreInfoIcon';

export default (props) => {
  const [cardHolderName, setCardHolderName] = useState("");
  const [cardHolderNameError, setCardHolderNameError] = useState(false);
  const [cardError, setCardError] = useState(false);
  const [collapsableContentShowing, setCollapsableContentShowing] = useState(false);
  const [cardInputHasErrors, setCardInputHasErrors] = useState(false);
  const [collapsableContentMaxHeight, setCollapsableContentMaxHeight] = useState(
    window.document.body.clientWidth > 450 ? 75 : 55
  );
  const [stripeElementFocused, setStripeElementFocused] = useState(false);
  const [errors, setErrors] = useState([]);
  const [customerData, setCustomerData] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const el2 = window.document.getElementById('add-payment-payment-chevron')
  const [saveInfo, setSaveInfo] = useState(false);
  const [successfulSubmission, setSuccessfulSubmission] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    if (firebase.auth().currentUser.uid) {
      // TODO
      // CATCH ANY ERRORS
      firebase.firestore().collection("stripe_customers").doc(firebase.auth().currentUser.uid)
        .onSnapshot(function(doc) {
            setCustomerData(doc.data());
        })
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

      const baseHeight = window.document.body.clientWidth > 450 ? 336 : 316;
      const errorsHeight = errors.length * 26;

      if (collapsableContentMaxHeight !== (baseHeight + errorsHeight)) {
        setCollapsableContentMaxHeight(baseHeight + errorsHeight)
      }
    }
  }, [errors, collapsableContentShowing])

  const handleSuccessfulFormSubmission = () => {
    setSuccessfulSubmission(true);
    setCardHolderName("");
    setCardHolderNameError(false);
    setCardInputHasErrors(false);
    setErrors([]);
    const cardElement = elements.getElement(CardElement)
    cardElement.clear();
    return setCollapsableContentShowing(false);
  }

  const handleAddPaymentMethod = async ev => { 
    ev.preventDefault();

    setSubmitting(true);
    setSuccessfulSubmission(false);
    setCardError(false);
    setCardHolderNameError(false);
    setErrors([]);

    if (cardHolderName.length === 0) {
      setErrors(['card_holder_name_error'])
      setCardHolderNameError(true)
      return setSubmitting(false)
    } 

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

    if (error) {
      if (error.type !== "card_error" || error.type !== "validation_error") {
        // TODO SPECIFY WHERE THIS ERROR IS COMING FROM EX: AddPaymentMethodForm -- HandleAddPaymentMethod function
        const sendErrorToBackend = firebase
          .functions()
          .httpsCallable("untypicalClientErrors");
        sendErrorToBackend(error)
          .then(async result => {
            // TODO //
            // NOTIFY USER DEV'S HAVE BEEN ALERTED OF THE ISSUE AND PROMPT TO TRY AGAIN 
          })
      }

      setErrors(['card_error'])
      setCardInputHasErrors(error)
      setCardError(true)
    } else {
      const dataToSend = {
        userUID: firebase.auth().currentUser.uid,
        saveInfo,
        paymentMethodId: setupIntent.payment_method
      }

      const handlePaymentMethodDetails = firebase
        .functions()
        .httpsCallable("addPaymentMethod");

      const { 
        data,
        error
       } = await handlePaymentMethodDetails(dataToSend)

       if (error) {
         // TODO 
         // UPDATE THE USER THAT THERE WAS AN ERROR WITH THEIR PURCHASE
         setSubmitting(false)
         return
       }

       props.setPaymentMethod(data.id)
       handleSuccessfulFormSubmission();
    }

    return setSubmitting(false)
  };

  const handleChange = (ev) => {
    const errors = [];

    if (!successfulSubmission) {
      if (cardHolderName.length === 0) {
        errors.push(setCardHolderNameError)
      } else {
        setCardHolderNameError(false)
      }
  
      if (ev.empty && !cardInputHasErrors) {
        setCardInputHasErrors({
          message: 'The field above is required'
        })
        errors.push(setCardError)
      } else if (!ev.empty && ev.error === undefined && cardInputHasErrors) {
        setCardInputHasErrors(false)
        setCardError(false);
      } else if (ev.error && !cardInputHasErrors) {
        setCardInputHasErrors(ev.error);
        errors.push(setCardError)
      }
  
      setErrors(errors);
  
      errors.map((err, idx) => {
        setTimeout(() => {
          return err(true);
        }, 40 * idx)
      });
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
    <div style={{
      position: "relative"
    }}>

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
        onClick={() => {
            if (stripeElementFocused) {
              return setTimeout(() => {
                setCollapsableContentShowing(!collapsableContentShowing)
              }, 200)
            } 
            setCollapsableContentShowing(!collapsableContentShowing)
        }} 
       
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

          {
            successfulSubmission ? (
              <span style={{
                color: "#54b654",
                marginLeft: "20px"
              }}>
                <FontAwesomeIcon icon={["fas", "check"]} />
              </span>
            ) : null
          }
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
        {
          cardHolderName.length > 0 ? (
            <div style={{
              position: "relative",
              width: "0px",
              height: "0px",
              // float
            }}>
              <label style={{
                zIndex: 2,
                float: "left",
                padding: "0px 5px 0px 5px",
                position: "absolute",
                width: "135px",
                left: "20px",
                fontSize: "12px",
                textTransform: "uppercase",
                top: "-8px",
                color: "#7c7979",
                background: "linear-gradient(0deg, #fbfbfb, #fbfbfb, #fff, #fff)",
                "-webkit-font-smoothing": "subpixel-antialiased"
              }}>
                Card holder name
              </label>
            </div>
          ) : null
        }
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
            onBlur={() => setStripeElementFocused(false)}
            onFocus={() => setStripeElementFocused(true)}
          />
        </div>

        {
          cardError && cardInputHasErrors ? (
            <div style={{ paddingTop: "10px", color: "#FF0000", textAlign: "center", fontSize: "13px" }}>
              {cardInputHasErrors.message}
            </div>
          ) : null
        }
      </div>

      <div style={{
        fontSize: "15px",
        paddingTop: "20px",
        paddingBottom: "3px",
        letterSpacing: "0.75px",
        textAlign: "center",
        height: "41px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer"
      }}
        onClick={() => setSaveInfo(!saveInfo)}
      >
        <div style={{ marginRight: "10px", height: "15px" }}>
          {
            saveInfo ? (
              <FontAwesomeIcon icon={['far', 'check-square']} />
            ) : (
              <FontAwesomeIcon icon={['far', 'square']} />
            )
          }
        </div>

        save this for later?
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
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
          <div className="circle"></div>
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
    </div>
  )
}