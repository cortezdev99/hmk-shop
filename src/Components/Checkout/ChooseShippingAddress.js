import React, { useState, useEffect } from 'react'
import firebase from 'firebase'
import 'firebase/firestore'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default (props) => {
  const [getBillingAddressesError, setGetBillingAddressesError] = useState(
    false
  );
  const [loadingBillingAddresses, setLoadingBillingAddresses] = useState(true);
  const [activeBillingAddress, setActiveBillingAddress] = useState(false);
  const [collapsableContentShowing, setCollapsableContentShowing] = useState(false);
  const [collapsableContentMaxHeight, setCollapsableContentMaxHeight] = useState(62)
  const el2 = document.getElementById("rotating-thinger-1");
  const el3 = document.getElementById("rotating-thinger-2");

  useEffect(() => {
    firebase.firestore()
      .collection("stripe_customers")
      .doc(firebase.auth().currentUser.uid)
      .collection("billing_addresses")
      .get()
      .then(snapshot => {
        if (snapshot.metadata.fromCache) {
          setGetBillingAddressesError(true);
        } else {
          if (snapshot.empty) {
            props.setNoBillingAddresses(true);
          }
  
          if (props.billingAddresses.length !== snapshot.size) {
            const currentState = props.billingAddresses;
            snapshot.forEach(doc => {
              currentState.push(doc.data());
            });
  
            props.setBillingAddresses([...currentState]);
          }
        }
  
        setLoadingBillingAddresses(false);
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
      const billingAddressesAdditionalHeight = props.billingAddresses.length * 65

      if (el2 !== null && el3 !== null && !el2.classList.contains('rotating-plus-minus-rotated-tester')) {
        el2.classList.toggle("rotating-plus-minus-rotated-tester");
        el3.classList.toggle("rotating-plus-minus-rotated-tester-1");
      }

      setCollapsableContentMaxHeight(82 + billingAddressesAdditionalHeight)
    }

  }, [ collapsableContentShowing ])

  const handleUseAddressClick = (billingAddress, billingAddressIdx) => {
    return (
      props.setBillingAddress(billingAddress),
      setActiveBillingAddress(billingAddressIdx)
    );
  };

  const handleScrollToAddBillingAddressSection = () => {
    const billingAddressWrapperElem = document.getElementById(
      "checkout-shipping-info-wrapper"
    );
    const billingAddressPlusMinusOne = document.getElementById(
      "shipping-address-rotating-thinger-1"
    );
    const billingAddressPlusMinusTwo = document.getElementById(
      "shipping-address-rotating-thinger-2"
    );
    billingAddressWrapperElem.scrollIntoView({
      block: "center",
      behavior: "smooth"
    });

    setTimeout(() => {
      if (
        billingAddressWrapperElem.classList.contains(
          "transform-add-shipping-inner-content"
        ) === false
      ) {
        billingAddressWrapperElem.classList.toggle(
          "transform-add-shipping-inner-content"
        );
        billingAddressPlusMinusOne.classList.toggle(
          "rotating-plus-minus-rotated-tester"
        );
        billingAddressPlusMinusTwo.classList.toggle(
          "rotating-plus-minus-rotated-tester-1"
        );
      }
    }, 300);
  };

  const handleGetBillingAddressesRetry = () => {
    setLoadingBillingAddresses(true);

    firebase.firestore()
      .collection("stripe_customers")
      .doc(firebase.auth().currentUser.uid)
      .collection("billing_addresses")
      .get()
      .then(snapshot => {
        if (snapshot.metadata.fromCache) {
          setGetBillingAddressesError(true)
        } else {
          if (snapshot.empty) {
            return props.setNoBillingAddresses(true);
          }

          if (props.billingAddresses.length !== snapshot.size) {
            const currentState = props.billingAddresses;
            snapshot.forEach(doc => {
              currentState.push(doc.data());
            });

            props.setBillingAddresses([...currentState]);
          }
        }

        setLoadingBillingAddresses(false);
      });
  };

  return (
    <div
      id="checkout-shipping-methods-wrapper"
      className="checkout-shipping-methods-wrapper"
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
          Choose from your shipping addresses
          <div style={{ paddingLeft: "15px", color: "#FF0000" }}>
            {props.noBillingAddressSelected && !props.billingAddress
              ? "* Required"
              : null}
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
            id="rotating-thinger-1"
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
            id="rotating-thinger-2"
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
        {!props.noBillingAddresses && props.billingAddresses.length > 0 ? (
          <div>
            {props.billingAddresses.map((billingAddress, billingAddressIdx) => {
              return (
                <button
                  key={billingAddressIdx}
                  onClick={() =>
                    handleUseAddressClick(billingAddress, billingAddressIdx)
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
                      {billingAddressIdx === activeBillingAddress ? (
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
                      <div style={{ paddingRight: "10px" }}>
                        {billingAddress.address.line1}
                      </div>
                    </div>

                    <div style={{ display: "flex" }}>
                      <div style={{ paddingRight: "10px" }}>
                        {billingAddress.address.state}
                      </div>
                      <div style={{ paddingRight: "10px" }}>
                        {billingAddress.address.postal_code}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        ) : !props.noBillingAddresses &&
          props.billingAddresses.length === 0 &&
          getBillingAddressesError &&
          !loadingBillingAddresses ? (
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
                onClick={handleGetBillingAddressesRetry}
                style={{ cursor: "pointer", textDecorationLine: "underline" }}
              >
                here
              </span>{" "}
              to retry.
            </div>
          </div>
        ) : props.noBillingAddresses &&
          props.billingAddresses.length === 0 &&
          !loadingBillingAddresses ? (
          <div style={{ marginTop: "20px", display: "flex" }}>
            <ul style={{ fontSize: "18px", color: "#FF8800" }}>
              <FontAwesomeIcon icon={["fas", "exclamation-triangle"]} />
            </ul>

            <div style={{ paddingLeft: "20px", fontSize: "15px" }}>
              You don't have any billing addresses, you can add one{" "}
              <span
                onClick={handleScrollToAddBillingAddressSection}
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