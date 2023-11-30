import React, { useState, useEffect } from "react";
import CountryDropdown from "./CountryDropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InputLabel from "../../Utilities/InputLabel";
import { auth } from "../../../Config/firebase";
import { httpsCallable } from "firebase/functions";

export default (props) => {
  const el2 = document.getElementById("add-shipping-address-chevron");
  const [errors, setErrors] = useState([]);
  const [collapsableContentShowing, setCollapsableContentShowing] =
    useState(false);
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
  const [addShippingMaxHeight, setAddShippingMaxHeight] = useState(
    window.document.body.clientWidth > 450 ? 75 : 55
  );
  const [submitting, setSubmitting] = useState(false);
  const [successfulFormSubmission, setSuccessfulSubmission] = useState(false);
  const [saveInfo, setSaveInfo] = useState(false);

  const handleSuccessfulFormSubmittion = () => {
    setFirstName("");
    setLastName("");
    setAddress("");
    setAddress2("");
    setCity("");
    setRegion([]);
    setState("");
    setZip("");
    setSuccessfulSubmission(true);
    setCollapsableContentShowing(false);
  };

  useEffect(() => {
    if (
      !collapsableContentShowing &&
      props.resizeObsMaxHeightReAlignment !== addShippingMaxHeight
    ) {
      // console.log(props.resizeObsMaxHeightReAlignment)
      setAddShippingMaxHeight(props.resizeObsMaxHeightReAlignment);
    }
  }, [props.resizeObsMaxHeightReAlignment]);

  useEffect(() => {
    if (!collapsableContentShowing) {
      if (el2 !== null && el2.classList.contains("chevron-rotated")) {
        el2.classList.toggle("chevron-rotated");
      }

      setAddShippingMaxHeight(window.document.body.clientWidth > 450 ? 75 : 55);
    } else {
      if (el2 !== null && !el2.classList.contains("chevron-rotated")) {
        el2.classList.toggle("chevron-rotated");
      }

      const errorsHeight = errors.length * 26;
      const baseHeight = window.document.body.clientWidth > 450 ? 594 : 704;
      const el = document.getElementById(
        "country-dropdown-collapsable-content-wrapper"
      );
      const collapsableCountryDropdownHeight = el.classList.contains(
        "country-dropdown-collapsable-content-showing"
      )
        ? 180
        : 0;
      setAddShippingMaxHeight(
        baseHeight + errorsHeight + collapsableCountryDropdownHeight
      );
    }
  }, [errors, collapsableContentShowing, successfulFormSubmission]);

  useEffect(() => {
    if (submitting) {
      setNoFirstNameErr(false);
      setNoLastNameErr(false);
      setNoAddressErr(false);
      setNoCityErr(false);
      setNoRegionErr(false);
      setNoStateErr(false);
      setNoZipErr(false);
      setSuccessfulSubmission(false);

      const errors = [];
      if (firstName.length === 0) {
        errors.push(setNoFirstNameErr);
      }

      if (lastName.length === 0) {
        errors.push(setNoLastNameErr);
      }

      if (address.length === 0) {
        errors.push(setNoAddressErr);
      }

      if (city.length === 0) {
        errors.push(setNoCityErr);
      }

      if (region.length === 0) {
        errors.push(setNoRegionErr);
      }

      if (state.length === 0) {
        errors.push(setNoStateErr);
      }

      if (zip.length === 0) {
        errors.push(setNoZipErr);
      }

      if (errors.length > 0) {
        setErrors(errors);

        errors.map((err, idx) => {
          setTimeout(() => {
            return err(true);
          }, 40 * idx);
        });
      } else {
        const data = {
          shippingAddress: {
            name: `${firstName} ${lastName}`,
            address: {
              line1: address,
              line2: address2,
              postal_code: zip,
              city,
              state,
              country: region,
            },
          },
        };

        if (saveInfo) {
          const handleSaveShippingInformation = httpsCallable(
            "handleSaveShippingInformation"
          );

          handleSaveShippingInformation({
            ...data,
            user: auth.currentUser.uid,
          });

          props.setBillingAddress(data);
          handleSuccessfulFormSubmittion();
        } else {
          props.setBillingAddress(data);
          handleSuccessfulFormSubmittion();
        }
      }

      setSubmitting(false);
    }
  }, [submitting]);

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
        transition: "max-height 0.7s",
      }}
    >
      <div
        onClick={() => setCollapsableContentShowing(!collapsableContentShowing)}
        className="add-shipping-form-wrapper"
        style={{
          cursor: "pointer",
          fontSize: "18px",
          padding: "0px 20px",
          paddingBottom: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            width: "calc(100% - 40px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            letterSpacing: "0.75px",
            height: "35px",
          }}
          className="add-shipping-header"
        >
          Add a shipping address
          {successfulFormSubmission ? (
            <span
              style={{
                color: "#54b654",
                marginLeft: "20px",
              }}
            >
              <FontAwesomeIcon icon={["fas", "check"]} />
            </span>
          ) : null}
        </div>

        <div
          id="add-shipping-address-chevron"
          className="add-shipping-address-chevron"
          style={{
            transition: "transform 0.7s",
          }}
        >
          <FontAwesomeIcon icon={["fas", "chevron-down"]} />
        </div>
      </div>

      <div className="checkout-shipping-info-name-wrapper">
        <div>
          {firstName.length > 0 && collapsableContentShowing ? (
            <InputLabel labelText="First Name" />
          ) : null}

          <input
            className="checkout-input"
            style={{
              border: `${
                noFirstNameErr && firstName.length === 0
                  ? "1px solid #FF0000"
                  : "1px solid #CCC"
              }`,
            }}
            placeholder="First name"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          {noFirstNameErr && firstName.length === 0 ? (
            <div
              style={{
                paddingTop: "10px",
                color: "#FF0000",
                textAlign: "center",
                fontSize: "13px",
              }}
            >
              The field above is required.
            </div>
          ) : null}
        </div>

        <div>
          {lastName.length > 0 && collapsableContentShowing ? (
            <InputLabel labelText="Last Name" />
          ) : null}

          <input
            className="checkout-input"
            style={{
              border: `${
                noLastNameErr && lastName.length === 0
                  ? "1px solid #FF0000"
                  : "1px solid #CCC"
              }`,
            }}
            placeholder="Last name"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          {noLastNameErr && lastName.length === 0 ? (
            <div
              style={{
                paddingTop: "10px",
                color: "#FF0000",
                textAlign: "center",
                fontSize: "13px",
              }}
            >
              The field above is required
            </div>
          ) : null}
        </div>
      </div>

      <div className="checkout-shipping-info-address-one-wrapper  checkout-input-padding">
        {address.length > 0 && collapsableContentShowing ? (
          <InputLabel labelText="Address" />
        ) : null}

        <input
          className="checkout-input"
          style={{
            border: `${
              noAddressErr && address.length === 0
                ? "1px solid #FF0000"
                : "1px solid #CCC"
            }`,
          }}
          placeholder="Address"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        {noAddressErr && address.length === 0 ? (
          <div
            style={{
              paddingTop: "10px",
              color: "#FF0000",
              textAlign: "center",
              fontSize: "13px",
            }}
          >
            The field above is required
          </div>
        ) : null}
      </div>

      <div className="checkout-shipping-info-address-two-wrapper checkout-input-padding">
        {address2.length > 0 && collapsableContentShowing ? (
          <InputLabel labelText="Apartment, Suite, etc. (optional)" />
        ) : null}

        <input
          className="checkout-input"
          placeholder="Apartment, Suite, etc. (optional)"
          type="text"
          value={address2}
          onChange={(e) => setAddress2(e.target.value)}
        />
      </div>

      <div className="checkout-shipping-info-city-wrapper checkout-input-padding">
        {city.length > 0 && collapsableContentShowing ? (
          <InputLabel labelText="City" />
        ) : null}

        <input
          className="checkout-input"
          style={{
            border: `${
              noCityErr && city.length === 0
                ? "1px solid #FF0000"
                : "1px solid #CCC"
            }`,
          }}
          placeholder="City"
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        {noCityErr && city.length === 0 ? (
          <div
            style={{
              paddingTop: "10px",
              color: "#FF0000",
              textAlign: "center",
              fontSize: "13px",
            }}
          >
            The field above is required
          </div>
        ) : null}
      </div>

      <div style={{ paddingTop: "20px" }}>
        {region.length > 0 && collapsableContentShowing ? (
          <InputLabel labelText="Region or Country" />
        ) : null}

        <CountryDropdown
          setRegion={(country) => setRegion(country)}
          region={region}
          addShippingMaxHeight={addShippingMaxHeight}
          setAddShippingMaxHeight={(val) => setAddShippingMaxHeight(val)}
          noRegionErr={noRegionErr}
        />

        {noRegionErr && region.length === 0 ? (
          <div
            style={{
              paddingTop: "10px",
              color: "#FF0000",
              textAlign: "center",
              fontSize: "13px",
            }}
          >
            The field above is required
          </div>
        ) : null}
      </div>

      <div className="checkout-shipping-info-region-state-city-wrapper checkout-input-padding">
        <div>
          {state.length > 0 && collapsableContentShowing ? (
            <InputLabel labelText="State" />
          ) : null}

          <input
            className="checkout-input"
            placeholder="State"
            style={{
              border: `${
                noStateErr && state.length === 0
                  ? "1px solid #FF0000"
                  : "1px solid #CCC"
              }`,
            }}
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />

          {noStateErr && state.length === 0 ? (
            <div
              style={{
                paddingTop: "10px",
                color: "#FF0000",
                textAlign: "center",
                fontSize: "13px",
              }}
            >
              The field above is required
            </div>
          ) : null}
        </div>

        <div>
          {zip.length > 0 && collapsableContentShowing ? (
            <InputLabel labelText="Zip Code" />
          ) : null}

          <input
            className="checkout-input"
            placeholder="Zip code"
            style={{
              border: `${
                noZipErr && zip.length === 0
                  ? "1px solid #FF0000"
                  : "1px solid #CCC"
              }`,
            }}
            type="text"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
          />

          {noZipErr && zip.length === 0 ? (
            <div
              style={{
                paddingTop: "10px",
                color: "#FF0000",
                textAlign: "center",
                fontSize: "13px",
              }}
            >
              The field above is required
            </div>
          ) : null}
        </div>
      </div>

      <div
        style={{
          fontSize: "15px",
          paddingTop: "20px",
          paddingBottom: "3px",
          letterSpacing: "0.75px",
          textAlign: "center",
          height: "41px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
        onClick={() => setSaveInfo(!saveInfo)}
      >
        <div style={{ marginRight: "10px", height: "15px" }}>
          {saveInfo ? (
            <FontAwesomeIcon icon={["far", "check-square"]} />
          ) : (
            <FontAwesomeIcon icon={["far", "square"]} />
          )}
        </div>
        save this for later?
      </div>

      <div style={{ marginTop: "20px" }}>
        {!submitting ? (
          <button
            onClick={() => setSubmitting(true)}
            style={{
              width: "100%",
              height: "45px",
              border: "none",
              backgroundColor: "#1c1b1b",
              color: "#fff",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Use this address
          </button>
        ) : (
          <button
            style={{
              width: "100%",
              height: "45px",
              border: "none",
              backgroundColor: "#1c1b1b",
              color: "#fff",
              borderRadius: "5px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div className="circle"></div>
          </button>
        )}
      </div>
    </div>
  );
};
