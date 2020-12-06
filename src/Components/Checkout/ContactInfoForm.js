import React, { useState, useEffect } from 'react'

export default (props) => {
  const [collapsableContentShowing, setCollapsableContentShowing] = useState(false);
  const [collapsableContentMaxHeight, setCollapsableContentMaxHeight] = useState(62)
  const el2 = document.getElementById("contact-info-rotating-thinger-1");
  const el3 = document.getElementById("contact-info-rotating-thinger-2");

  useEffect(() => {
    if (!collapsableContentShowing) {
      if (el2 !== null && el3 !== null && el3.classList.contains('rotating-plus-minus-rotated-tester-1')) {
        el3.classList.toggle('rotating-plus-minus-rotated-tester-1')
        el2.classList.toggle('rotating-plus-minus-rotated-tester')
      }

      setCollapsableContentMaxHeight(62);
    } else {
      if (el2 !== null && el3 !== null && !el3.classList.contains('rotating-plus-minus-rotated-tester-1')) {
        el3.classList.toggle('rotating-plus-minus-rotated-tester-1')
        el2.classList.toggle('rotating-plus-minus-rotated-tester')
      }
      
      const baseHeight = 212
      setCollapsableContentMaxHeight(baseHeight)
    }
  }, [collapsableContentShowing])

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
          // props.handleOpeningInnerContent(
          //   "checkout-contact-info-wrapper",
          //   "contact-info-rotating-thinger-"
          // )
          setCollapsableContentShowing(!collapsableContentShowing)
        }
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
          className="shipping-toggle-header"
          style={{ display: "flex" }}
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
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            width: "12px"
          }}
        >
          <div
            id="contact-info-rotating-thinger-1"
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
            id="contact-info-rotating-thinger-2"
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