import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const CheckoutFormGroupWhichFormActive = ({
  whichFormActive,
  setWhichFormActive,
}) => {
  return (
    <div className="checkout-current-form-wrapper">
      <div className="checkount-current-form-text checkout-current-form-completed-or-active">
        Information
      </div>

      <div
        className={`checkount-current-form-icon ${
          whichFormActive === "shipping"
            ? "checkout-current-form-completed-or-active"
            : null
        }`}
      >
        <FontAwesomeIcon icon={["fas", "arrow-right"]} />
      </div>

      <div
        className={`checkount-current-form-text ${
          whichFormActive === "shipping"
            ? "checkout-current-form-completed-or-active"
            : whichFormActive === "payment"
            ? "checkout-current-form-completed-or-active"
            : null
        }`}
      >
        Shipping
      </div>

      <div
        className={`checkount-current-form-icon ${
          whichFormActive === "payment"
            ? "checkout-current-form-completed-or-active"
            : null
        }`}
      >
        <FontAwesomeIcon icon={["fas", "arrow-right"]} />
      </div>

      <div
        className={`checkount-current-form-text ${
          whichFormActive === "payment"
            ? "checkout-current-form-completed-or-active"
            : null
        }`}
      >
        Payment
      </div>
    </div>
  );
};

export default CheckoutFormGroupWhichFormActive;
