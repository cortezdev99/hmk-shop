import React, { useState, useContext } from "react";
import { Navigate, Redirect, redirect } from "react-router-dom";
import CartContext from "../../Contexts/CartContext";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../Config/firebase";
import InputLabel from "../Utilities/InputLabel";

export default () => {
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneErr, setPhoneErr] = useState(false);
  const [specialErr, setSpecialErr] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [successfulSubmition, setSuccessfulSubmition] = useState(false);

  const handleCreateAccountClick = (e) => {
    e.preventDefault();
    // start loading state
    setSubmitting(true);
    // clear error state
    setEmailErr(false);
    setPasswordErr(false);
    setPhoneErr(false);

    // setup variables
    const errors = [];
    const passwordHasNumberRegex = /\d/;
    const passwordHasSpecialCharRegex = /[^A-Za-z0-9]/;

    // Check inputs for errors, all errors if any get pushed into a list
    if (email.length === 0) {
      errors.push([setEmailErr, true]);
    }

    if (password.length === 0) {
      errors.push([setPasswordErr, true]);
    }

    if (
      password.length < 8 ||
      !passwordHasNumberRegex.test(password) ||
      !passwordHasSpecialCharRegex.test(password)
    ) {
      errors.push([
        setPasswordErr,
        "We require: A minimum of 8 characters, one number, and one special character",
      ]);
    }

    if (phone.length === 0) {
      errors.push([setPhoneErr, true]);
    }

    // TODO create regex to check if valid phone number was submitted

    // if there's errors, loop through them and set error state
    if (errors.length > 0) {
      // clear loading state and return errors
      setSubmitting(false);

      return errors.map((err, idx) => {
        setTimeout(() => {
          const errorStateToSet = err[0];
          const errorStateToSetValue = err[1];
          return errorStateToSet(errorStateToSetValue);
        }, 40 * idx);
      });
    }

    // if no errors continue to creating account
    return createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        // clear loading state
        setSubmitting(false);

        // TODO Change successful form submission state and move to next form
      })
      .catch((err) => {
        // clear loading state and return error
        setSubmitting(false);

        if (err.code === "auth/invalid-email") {
          return setEmailErr("You submitted an invalid email");
        } else if (err.code === "auth/email-already-exists") {
          // TODO CREATE LOGIN FORM AND DIRECT USER TO SIGN IN
          return setEmailErr(
            "The provided email is already in use by an existing user"
          );
        } else if (err.code === "auth/internal-error") {
          return setSpecialErr(
            "The server encountered an unexpected error while trying to process the request. Please try again in a few seconds."
          );
        } else if (err.code === "auth/invalid-phone-number") {
          return setPhoneErr(
            "The provided value for the phone number is invalid"
          );
        } else {
          // TODO Create user facing special error message below form and above submit button.
          return setSpecialErr(err.message);
        }
      });
  };

  return (
    <div className="create-account-wrapper">
      <div className="create-account-form-container">
        <div className="create-account-form-header">Account</div>

        <form className="create-account-form-wrapper">
          <div className="create-account-form-input-wrapper">
            {email.length > 0 ? (
              <InputLabel
                labelText="Email"
                labelStyle={{
                  color: `${emailErr ? "#FF0000" : "#7c7979"}`,
                }}
              />
            ) : null}

            <input
              className={`create-account-form-input ${
                emailErr ? "create-account-form-input-error" : null
              }`}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />

            {emailErr ? (
              <div className="create-account-form-input-error-text">
                {email.length > 0 ? emailErr : "The field above is required"}
              </div>
            ) : null}
          </div>

          <div className="create-account-form-input-wrapper">
            {password.length > 0 ? (
              <InputLabel
                labelText="Password"
                labelStyle={{
                  color: `${passwordErr ? "#FF0000" : "#7c7979"}`,
                }}
              />
            ) : null}

            <input
              className={`create-account-form-input ${
                passwordErr ? "create-account-form-input-error" : null
              }`}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />

            {passwordErr ? (
              <div className="create-account-form-input-error-text">
                {password.length > 0
                  ? passwordErr
                  : "The field above is required"}
              </div>
            ) : null}
          </div>

          <div className="create-account-form-input-wrapper">
            {phone.length > 0 ? (
              <InputLabel
                labelText="Phone Number"
                labelStyle={{
                  color: `${phoneErr ? "#FF0000" : "#7c7979"}`,
                }}
              />
            ) : null}

            <input
              className={`create-account-form-input ${
                phoneErr ? "create-account-form-input-error" : null
              }`}
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone Number"
            />

            {phoneErr ? (
              <div className="create-account-form-input-error-text">
                {phone.length > 0 ? phoneErr : "The field above is required"}
              </div>
            ) : null}
          </div>

          {specialErr ? (
            <div className="create-account-form-special-error">
              {specialErr}
            </div>
          ) : null}

          <div className="create-account-form-buttons-wrapper">
            <button
              className="create-account-form-button"
              onClick={handleCreateAccountClick}
            >
              {submitting ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
