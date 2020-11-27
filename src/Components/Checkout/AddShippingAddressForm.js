import React, { useState, useEffect } from 'react'
import firebase from 'firebase'
import CountryDropdown from './CountryDropdown';

export default (props) => {
  const [errors, setErrors] = useState([])
  const [collapsableContentShowing, setCollapsableContentShowing] = useState(false)
  const [noFirstNameErr, setNoFirstNameErr] = useState(false);
  const [noLastNameErr, setNoLastNameErr] = useState(false);
  const [noAddressErr, setNoAddressErr] = useState(false);
  const [noCityErr, setNoCityErr] = useState(false);
  const [noRegionErr, setNoRegionErr] = useState(false);
  const [noStateErr, setNoStateErr] = useState(false);
  const [noZipErr, setNoZipErr] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [region, setRegion] = useState([]);
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [addShippingMaxHeight, setAddShippingMaxHeight] = useState(62)

  useEffect(() => {
    if (!collapsableContentShowing) {
      setAddShippingMaxHeight(62);
    } else {
      const errorsHeight = errors.length * 38;
      const baseHeight = window.document.body.clientWidth > 450 ? 539 : 690;
      const el = document.getElementById("country-dropdown-collapsable-content-wrapper")
      const collapsableCountryDropdownHeight = el.classList.contains('country-dropdown-collapsable-content-showing') ? 180 : 0
      // console.log(el.classList.contains('country-dropdown-collapsable-content-showing'))
      // if (el.classList.contains('country-dropdown-collapsable-content-showing') {
  
      // }
      setAddShippingMaxHeight((baseHeight + errorsHeight) + collapsableCountryDropdownHeight)
    }
  }, [ errors, collapsableContentShowing ])

  const handleOpeningInnerContent = (wrapper, plusMinus) => {
    setCollapsableContentShowing(!collapsableContentShowing)
    // const el = document.getElementById(wrapper);
    // const el2 = document.getElementById(`${plusMinus}1`);
    // const el3 = document.getElementById(`${plusMinus}2`);

    // if (el.classList.contains("transform-add-shipping-inner-content" !== true)) {
    //   el.classList.toggle("transform-add-shipping-inner-content");
    // }

    // if (el.classList.contains('transform-add-shipping-inner-content-maximum')) {
    //   const el4 = document.getElementById("country-dropdown-collapsable-content-wrapper")
    //   const el5 = document.getElementById("country-dropdown-chevron")

    //   el4.classList.toggle('country-dropdown-collapsable-content-showing')
    //   el5.classList.toggle('country-dropdown-chevron-rotated')
    //   el.classList.toggle("transform-add-shipping-inner-content-maximum")
    // }

    // el.classList.toggle("transform-add-shipping-inner-content");
    // el2.classList.toggle("rotating-plus-minus-rotated-tester");
    // el3.classList.toggle("rotating-plus-minus-rotated-tester-1");
  };

  const handleAddShippingAddress = () => {
    setNoFirstNameErr(false);
    setNoLastNameErr(false);
    setNoAddressErr(false);
    setNoCityErr(false);
    setNoRegionErr(false);
    setNoStateErr(false);
    setNoZipErr(false);
    
    const errors = [];
    if (address.length === 0) {
      errors.push(setNoAddressErr);
    }

    if (city.length === 0) {
      errors.push(setNoCityErr);
    }

    if (region.length === 0) {
      errors.push(setNoRegionErr);
    }

    if (zip.length === 0) {
      errors.push(setNoZipErr);
    }

    if (state.length === 0) {
      errors.push(setNoStateErr);
    }

    if (firstName.length === 0) {
      errors.push(setNoFirstNameErr);
    }

    if (lastName.length === 0) {
      errors.push(setNoLastNameErr);
    }

    if (errors.length > 0) {
      // const el = document.getElementById("checkout-shipping-info-wrapper")
      // if (window.document.body.clientWidth > 450) {
      //   el.classList.toggle('add-shipping-address-errors-max-height-small')
      // } else {
      //   el.classList.toggle('add-shipping-address-errors-max-height-large')
      // }

      setErrors(errors)

      errors.map(err => {
        return err(true);
      });
    } else {
      firebase
        .firestore()
        .collection("stripe_customers")
        .doc(firebase.auth().currentUser.uid)
        .collection("billing_addresses")
        .add({
          name: `${firstName} ${lastName}`,
          address: {
            line1: address,
            line2: address2,
            postal_code: zip,
            city,
            state,
            country: region
          }
        })
        .then(resp => {
          resp.onSnapshot(
            {
              // Listen for document metadata changes
              includeMetadataChanges: true
            },
            doc => {
              if (props.noBillingAddresses) {
                props.setNoBillingAddresses(false);
              }

              const currentState = props.billingAddresses;
              currentState.push(doc.data());
              props.setBillingAddresses([...currentState]);
            }
          );
        })
        .catch(err => {
          alert(err);
        });
    }
  };

  return (
    <div
    id="checkout-shipping-info-wrapper"
    className="checkout-shipping-info-wrapper"
    style={{
      marginTop: "80px",
      height: "100%",
      maxHeight: `${addShippingMaxHeight}px`,
      overflow: "hidden",
      paddingBottom: "40px",
      borderBottom: "1px solid #CCC",
      width: "100%",
      transition: "max-height 0.7s"
    }}
  >
    <div
      onClick={() =>
        handleOpeningInnerContent(
          "checkout-shipping-info-wrapper",
          "shipping-address-rotating-thinger-"
        )
      }
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
      <div className="shipping-toggle-header">
        Add a shipping address
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
          id="shipping-address-rotating-thinger-1"
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
          id="shipping-address-rotating-thinger-2"
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

    <div className="checkout-shipping-info-name-wrapper">
      <div>
        <input
          className="checkout-input"
          placeholder="First name"
          type="text"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
        />

        {noFirstNameErr && firstName.length === 0 ? (
          <div style={{ paddingTop: "20px", color: "#FF0000", textAlign: "center" }}>
            Required
          </div>
        ) : null}
      </div>

      <div>
        <input
          className="checkout-input"
          placeholder="Last name"
          type="text"
          value={lastName}
          onChange={e => setLastName(e.target.value)}
        />

        {noLastNameErr && lastName.length === 0 ? (
          <div style={{ paddingTop: "20px", color: "#FF0000", textAlign: "center" }}>
            Required
          </div>
        ) : null}
      </div>
    </div>

    <div className="checkout-shipping-info-address-one-wrapper  checkout-input-padding">
      <input
        className="checkout-input"
        placeholder="Address"
        type="text"
        value={address}
        onChange={e => setAddress(e.target.value)}
      />

      {noAddressErr && address.length === 0 ? (
        <div style={{ paddingTop: "20px", color: "#FF0000", textAlign: "center" }}>
          Required
        </div>
      ) : null}
    </div>

    <div className="checkout-shipping-info-address-two-wrapper checkout-input-padding">
      <input
        className="checkout-input"
        placeholder="Apartment, Suite, etc. (optional)"
        type="text"
        value={address2}
        onChange={e => setAddress2(e.target.value)}
      />
    </div>

    <div className="checkout-shipping-info-city-wrapper checkout-input-padding">
      <input
        className="checkout-input"
        placeholder="City"
        type="text"
        value={city}
        onChange={e => setCity(e.target.value)}
      />

      {noCityErr && city.length === 0 ? (
        <div style={{ paddingTop: "20px", color: "#FF0000", textAlign: "center" }}>
          Required
        </div>
      ) : null}
    </div>

    <div style={{ paddingTop: "20px" }}>
      <CountryDropdown
        setRegion={country => setRegion(country)} 
        addShippingMaxHeight={addShippingMaxHeight}
        setAddShippingMaxHeight={(val) => setAddShippingMaxHeight(val)}
      />

      {noRegionErr && region.length === 0 ? (
        <div style={{ paddingTop: "20px", color: "#FF0000", textAlign: "center" }}>
          Required
        </div>
      ) : null}
    </div>

    <div className="checkout-shipping-info-region-state-city-wrapper checkout-input-padding">
      <div>
        <input
          className="checkout-input"
          placeholder="State"
          type="text"
          value={state}
          onChange={e => setState(e.target.value)}
        />

        {noStateErr && state.length === 0 ? (
          <div style={{ paddingTop: "20px", color: "#FF0000", textAlign: "center" }}>
            Required
          </div>
        ) : null}
      </div>

      <div>
        <input
          className="checkout-input"
          placeholder="Zip code"
          type="text"
          value={zip}
          onChange={e => setZip(e.target.value)}
        />

        {noZipErr && zip.length === 0 ? (
          <div style={{ paddingTop: "20px", color: "#FF0000", textAlign: "center" }}>
            Required
          </div>
        ) : null}
      </div>
    </div>

    <div style={{ marginTop: "20px" }}>
      <button
        onClick={handleAddShippingAddress}
        style={{
          padding: "0 2rem",
          height: "45px",
          border: "none",
          backgroundColor: "#1c1b1b",
          color: "#fff",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        Add this address
      </button>
    </div>
  </div>
  )
}