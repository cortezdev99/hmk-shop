import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react'

export default (props) => {
  const [collapsableContentShowing, setCollapsableContentShowing] = useState(false);
  const [collapsableContentMaxHeight, setCollapsableContentMaxHeight] = useState(55)
  const el2 = document.getElementById("contact-form-chevron");

  useEffect(() => {
    if (!collapsableContentShowing) {
      if (el2 !== null && el2.classList.contains('chevron-rotated')) {
        el2.classList.toggle('chevron-rotated')
      }

      setCollapsableContentMaxHeight(55);
    } else {
      if (el2 !== null && !el2.classList.contains('chevron-rotated')) {
        el2.classList.toggle('chevron-rotated')
      }
      
      const baseHeight = 212
      setCollapsableContentMaxHeight(baseHeight)
    }
  }, [collapsableContentShowing])

  useEffect(() => {
    if (!collapsableContentShowing && props.resizeObsMaxHeightReAlignment !== collapsableContentMaxHeight) {
      // console.log(props.resizeObsMaxHeightReAlignment)
      setCollapsableContentMaxHeight(props.resizeObsMaxHeightReAlignment)
    }
  }, [props.resizeObsMaxHeightReAlignment])

  return (
    <div
      id="checkout-contact-info-wrapper"
      className="checkout-contact-info-wrapper"
      style={{
        marginTop: "40px",
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
        onClick={() =>
          setCollapsableContentShowing(!collapsableContentShowing)
        }
        className="contact-info-form-wrapper"
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
        <div
          className="contact-info-form-header"
          style={{ letterSpacing: "0.75px", height: "35px", width: "calc(100% - 40px)", display: "flex", alignItems: "center" }}
        >
          Contact information
          <div style={{ paddingLeft: "15px", color: "#FF0000" }}>
            {props.noEmail &&
            props.noPhoneNumber &&
            props.phone.length === 0 &&
            props.email.length === 0
              ? "* Required"
              : (props.noEmail && props.email.length === 0) ||
                (props.noPhoneNumber && props.phone.length === 0)
              ? "* Incomplete"
              : null}
          </div>
        </div>

        <div
          id="contact-form-chevron"
          className="contact-form-chevron"
          style={{
            transition: "transform 0.7s"
          }}
        >
          <FontAwesomeIcon icon={["fas", "chevron-down"]} />
        </div>
      </div>

      <div className="checkout-contact-info-input-wrapper">
        <input
          className="checkout-input"
          placeholder="Email"
          type="email"
          value={props.email}
          onChange={e => props.setEmail(e.target.value)}
        />
      </div>

      <div className="checkout-contact-info-phone-input-wrapper">
        <input
          className="checkout-input"
          placeholder="Phone"
          type="tel"
          value={props.phone.replace(
            /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
            "($1) $2-$3"
          )}
          onChange={e => props.setPhone(e.target.value)}
        />
      </div>
    </div>
  )
}