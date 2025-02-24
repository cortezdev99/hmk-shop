import React, { useEffect, useState } from "react";
import CountryDropdown from "./CountryDropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InputLabel from "../../Utilities/InputLabel";
import { auth } from "../../../Config/firebase";
import { httpsCallable } from "firebase/functions";

const ShippingForm = (props) => {
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
  const [submitting, setSubmitting] = useState(false);
  const [saveInfo, setSaveInfo] = useState(false);

  const {
    errors,
    setErrors,
    successfulFormSubmission,
    setSuccessfulSubmission,
    addShippingMaxHeight,
    setAddShippingMaxHeight,
  } = props;

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
  };

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
    <form
      onSubmit={(e) => e.preventDefault(e)}
      className="checkout-add-shipping-address-form-wrapper"
    >
      <div className="checkout-add-shipping-address-name-group-wrapper">
        <div className="checkout-add-shipping-address-name-wrapper">
          {firstName.length > 0 ? <InputLabel labelText="First Name" /> : null}

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
            <div className="checkout-add-shipping-address-input-error">
              The field above is required.
            </div>
          ) : null}
        </div>

        <div className="checkout-add-shipping-address-name-wrapper">
          {lastName.length > 0 ? <InputLabel labelText="Last Name" /> : null}

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
            <div className="checkout-add-shipping-address-input-error">
              The field above is required
            </div>
          ) : null}
        </div>
      </div>

      <div className="checkout-add-shipping-address-address-one-wrapper">
        {address.length > 0 ? <InputLabel labelText="Address" /> : null}

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
          <div className="checkout-add-shipping-address-input-error">
            The field above is required
          </div>
        ) : null}
      </div>

      <div className="checkout-add-shipping-address-address-two-wrapper">
        {address2.length > 0 ? (
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

      <div className="checkout-add-shipping-address-city-wrapper">
        {city.length > 0 ? <InputLabel labelText="City" /> : null}

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
          <div className="checkout-add-shipping-address-input-error">
            The field above is required
          </div>
        ) : null}
      </div>

      <div className="checkout-add-shipping-address-region-wrapper">
        {region.length > 0 ? (
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
          <div className="checkout-add-shipping-address-input-error">
            The field above is required
          </div>
        ) : null}
      </div>

      <div className="checkout-add-shipping-address-state-zip-group-wrapper">
        <div className="checkout-add-shipping-address-state-wrapper">
          {state.length > 0 ? <InputLabel labelText="State" /> : null}

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
            <div className="checkout-add-shipping-address-input-error">
              The field above is required
            </div>
          ) : null}
        </div>

        <div className="checkout-add-shipping-address-zip-wrapper">
          {zip.length > 0 ? <InputLabel labelText="Zip Code" /> : null}

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
            <div className="checkout-add-shipping-address-input-error">
              The field above is required
            </div>
          ) : null}
        </div>
      </div>

      <div
        className="checkout-add-shipping-address-save-shipping-wrapper"
        onClick={() => setSaveInfo(!saveInfo)}
      >
        <div className="checkout-add-shipping-address-save-shipping-icon-wrapper">
          {saveInfo ? (
            <FontAwesomeIcon icon={["far", "check-square"]} />
          ) : (
            <FontAwesomeIcon icon={["far", "square"]} />
          )}
        </div>

        <div className="checkout-add-shipping-address-save-shipping-text">
          save this for later?
        </div>
      </div>

      <div className="add-shipping-address-form-button-wrapper">
        {!submitting ? (
          <button
            onClick={() => setSubmitting(true)}
            className="add-shipping-address-form-button"
            d
          >
            Use this address
          </button>
        ) : (
          <button className="add-shipping-address-form-special-button">
            <div className="circle"></div>
          </button>
        )}
      </div>
    </form>
  );
};

export default ShippingForm;
