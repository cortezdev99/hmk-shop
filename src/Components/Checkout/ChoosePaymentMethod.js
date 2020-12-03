import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import firebase from 'firebase'
import 'firebase/firestore'

export default (props) => {
  const [loadingPaymentMethods, setLoadingPaymentMethods] = useState(true);
  const [activePaymentMethod, setActivePaymentMethod] = useState(false);
  const [getPaymentMethodsError, setGetPaymentMethodsError] = useState(false);
  const [collapsableContentShowing, setCollapsableContentShowing] = useState(false);
  const [collapsableContentMaxHeight, setCollapsableContentMaxHeight] = useState(62)
  const el2 = document.getElementById("rotating-thing-1");
  const el3 = document.getElementById("rotating-thing-2");

  useEffect(() => {

    firebase.firestore()
      .collection("stripe_customers")
      .doc(firebase.auth().currentUser.uid)
      .collection("payment_methods")
      .get()
      .then(snapshot => {
        if (snapshot.metadata.fromCache) {
          setGetPaymentMethodsError(true);
        } else {
          if (snapshot.empty) {
            props.setNoPaymentMethods(true);
          } else if (props.paymentMethods.length !== snapshot.size) {
            const currentState = props.paymentMethods;
            snapshot.forEach(doc => {
              currentState.push(doc.data());
            });
  
            props.setPaymentMethods([...currentState]);
          }
        }
  
        setLoadingPaymentMethods(false);
      });
  }, [])

  useEffect(() => {
    if (!collapsableContentShowing) {
      if (el2 !== null && el3 !== null && el2.classList.contains('rotating-plus-minus-rotated-tester')) {
        el2.classList.toggle("rotating-plus-minus-rotated-tester");
        el3.classList.toggle("rotating-plus-minus-rotated-tester-1");
      }

      setCollapsableContentMaxHeight(62)
    } else {
      const paymentMethodsAdditionalHeight = props.paymentMethods.length * 65

      if (el2 !== null && el3 !== null && !el2.classList.contains('rotating-plus-minus-rotated-tester')) {
        el2.classList.toggle("rotating-plus-minus-rotated-tester");
        el3.classList.toggle("rotating-plus-minus-rotated-tester-1");
      }

      setCollapsableContentMaxHeight(82 + paymentMethodsAdditionalHeight)
    }
  }, [ collapsableContentShowing ])

  const handleUsePaymentClick = (paymentMethod, paymentMethodIdx) => {
    return (
      props.setPaymentMethod(paymentMethod.id),
      setActivePaymentMethod(paymentMethodIdx)
    );
  };

  const handleScrollToAddPaymentMethodSection = () => {
    const addPaymentMethodElem = document.getElementById(
      "checkout-add-payment-wrapper"
    );
    const addPaymentMethodPlusMinusOne = document.getElementById(
      "add-payment-rotating-thinger-1"
    );
    const addPaymentMethodPlusMinusTwo = document.getElementById(
      "add-payment-rotating-thinger-2"
    );
    addPaymentMethodElem.scrollIntoView({
      block: "center",
      behavior: "smooth"
    });

    setTimeout(() => {
      if (
        addPaymentMethodElem.classList.contains(
          "transform-add-payment-inner-content"
        ) === false
      ) {
        addPaymentMethodElem.classList.toggle(
          "transform-add-payment-inner-content"
        );
        addPaymentMethodPlusMinusOne.classList.toggle(
          "rotating-plus-minus-rotated-tester"
        );
        addPaymentMethodPlusMinusTwo.classList.toggle(
          "rotating-plus-minus-rotated-tester-1"
        );
      }
    }, 300);
  };

  const handleGetPaymentMethodsRetry = () => {
    setLoadingPaymentMethods(true);

    firebase.firestore()
      .collection("stripe_customers")
      .doc(firebase.auth().currentUser.uid)
      .collection("payment_methods")
      .get()
      .then(snapshot => {
        if (snapshot.metadata.fromCache) {
          setGetPaymentMethodsError(true);
        } else {
          if (snapshot.empty) {
            props.setNoPaymentMethods(true);
          } else if (props.paymentMethods.length !== snapshot.size) {
            const currentState = props.paymentMethods;
            snapshot.forEach(doc => {
              currentState.push(doc.data());
            });

            props.setPaymentMethods([...currentState]);
          }
        }

        setLoadingPaymentMethods(false);
      });
  };

  return (
    <div
      id="checkout-payment-methods-wrapper"
      style={{
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
          paddingBottom: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        <div className="shipping-toggle-header" style={{ display: "flex" }}>
          Choose from your payment methods
          <div style={{ paddingLeft: "15px", color: "#FF0000" }}>
            {props.noPaymentMethodSelected && !props.paymentMethod ? "* Required" : null}
          </div>
        </div>

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
            id="rotating-thing-1"
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
            id="rotating-thing-2"
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
        {!props.noPaymentMethods &&
        props.paymentMethods.length > 0 &&
        !loadingPaymentMethods ? (
          <div>
            {props.paymentMethods.map((paymentMethod, paymentMethodIdx) => {
              return (
                <button
                  key={paymentMethodIdx}
                  onClick={() =>
                    handleUsePaymentClick(paymentMethod, paymentMethodIdx)
                  }
                  style={{
                    marginTop: "20px",
                    height: "45px",
                    display: "flex",
                    width: "100%",
                    border: "1px solid #CCC",
                    borderRadius: "5px",
                    background: "transparent",
                    padding: "0px",
                    cursor: "pointer"
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: "10%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRight: "1px solid #CCC"
                    }}
                  >
                    <div style={{ fontSize: "12px" }}>
                      {paymentMethodIdx === activePaymentMethod ? (
                        <FontAwesomeIcon icon={["fas", "circle"]} />
                      ) : (
                        <FontAwesomeIcon icon={["far", "circle"]} />
                      )}
                    </div>
                  </div>

                  <div
                    style={{
                      height: "100%",
                      width: "90%",
                      display: "flex",
                      backgroundColor: "#fbfbfb",
                      borderTopRightRadius: "5px",
                      borderBottomRightRadius: "5px",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "0 20px",
                      fontSize: "14px"
                    }}
                  >
                    <div style={{ display: "flex" }}>
                      <div
                        style={{
                          paddingRight: "10px",
                          textTransform: "capitalize"
                        }}
                      >
                        {paymentMethod.card.brand}
                      </div>
                      <div style={{ paddingRight: "10px" }}>****</div>
                      <div>{paymentMethod.card.last4}</div>
                    </div>

                    <div style={{ display: "flex" }}>
                      <div style={{ paddingRight: "10px" }}>Expires</div>
                      <div style={{ paddingRight: "10px" }}>
                        {paymentMethod.card.exp_month}
                      </div>
                      <div style={{ paddingRight: "10px" }}>/</div>
                      <div>{paymentMethod.card.exp_year}</div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        ) : !props.noPaymentMethods &&
          props.paymentMethods.length === 0 &&
          getPaymentMethodsError &&
          !loadingPaymentMethods ? (
          <div
            style={{
              marginTop: "20px",
              display: "flex",
              alignItems: "center"
            }}
          >
            <ul style={{ fontSize: "22px", color: "#FF0000" }}>
              <FontAwesomeIcon icon={["fas", "dizzy"]} />
            </ul>

            <div style={{ paddingLeft: "20px", fontSize: "15px" }}>
              Looks like there was a problem with your internet connection.
              Click{" "}
              <span
                onClick={handleGetPaymentMethodsRetry}
                style={{ cursor: "pointer", textDecorationLine: "underline" }}
              >
                here
              </span>{" "}
              to retry.
            </div>
          </div>
        ) : props.noPaymentMethods &&
          props.paymentMethods.length === 0 &&
          !loadingPaymentMethods ? (
          <div style={{ marginTop: "20px", display: "flex" }}>
            <ul style={{ fontSize: "18px", color: "#FF8800" }}>
              <FontAwesomeIcon icon={["fas", "exclamation-triangle"]} />
            </ul>

            <div style={{ paddingLeft: "20px", fontSize: "15px" }}>
              You don't have any payment methods, you can add one{" "}
              <span
                onClick={handleScrollToAddPaymentMethodSection}
                style={{ cursor: "pointer", textDecorationLine: "underline" }}
              >
                here
              </span>
              !
            </div>
          </div>
        ) : (
          <div style={{ marginTop: "20px", display: "flex" }}>
            <ul style={{ fontSize: "18px", color: "#CCC" }}>
              <FontAwesomeIcon icon={["fas", "circle-notch"]} spin={true} />
            </ul>

            <div style={{ paddingLeft: "20px", fontSize: "15px" }}>
              Loading...
            </div>
          </div>
        )}
      </div>
    </div>
  );
}