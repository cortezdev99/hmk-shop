import React, { useState, useEffect } from "react";
import CountryDropdown from "./CountryDropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InputLabel from "../../Utilities/InputLabel";
import { auth } from "../../../Config/firebase";
import { httpsCallable } from "firebase/functions";
import ShippingForm from "./ShippingForm";

export default (props) => {
  const el2 = document.getElementById("add-shipping-address-chevron");
  const [errors, setErrors] = useState([]);
  const [collapsableContentShowing, setCollapsableContentShowing] =
    useState(false);
  const [addShippingMaxHeight, setAddShippingMaxHeight] = useState(
    window.document.body.clientWidth > 450 ? 75 : 55
  );
  const [successfulFormSubmission, setSuccessfulSubmission] = useState(false);

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
      const baseHeight =
        window.document.body.clientWidth > 450 ? 594 + 40 : 704 + 40;
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

      <ShippingForm
        errors={errors}
        setErrors={setErrors}
        successfulFormSubmission={successfulFormSubmission}
        setSuccessfulSubmission={setSuccessfulSubmission}
        addShippingMaxHeight={addShippingMaxHeight}
        setAddShippingMaxHeight={setAddShippingMaxHeight}
      />
    </div>
  );
};
