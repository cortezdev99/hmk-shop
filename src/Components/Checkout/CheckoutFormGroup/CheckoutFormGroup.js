import React, { useState } from "react";
import CheckoutFormGroupWhichFormActive from "./CheckoutFormGroupWhichFormActive";
import { auth } from "../../../Config/firebase";
import CreateAccount from "../Account/CreateAccount";
import AddShippingAddress from "../Shipping/AddShippingAddress";

const CheckoutFormGroup = () => {
  const [whichFormActive, setWhichFormActive] = useState(
    auth.currentUser ? "shipping" : "information"
  );

  return (
    <div>
      <CheckoutFormGroupWhichFormActive
        whichFormActive={whichFormActive}
        setWhichFormActive={(e) => setWhichFormActive(e.target.value)}
      />

      {whichFormActive !== "shipping" && whichFormActive !== "information" ? (
        <CreateAccount />
      ) : whichFormActive === "shipping" ? (
        <AddShippingAddress />
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default CheckoutFormGroup;
