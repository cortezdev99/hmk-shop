import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export default (props) => {
  const handleCollapsableContent = () => {
    const el = document.getElementById("country-dropdown-collapsable-content-wrapper")
    if (el !== null) {
      el.classList.toggle('country-dropdown-collapsable-content-showing')
    }
  }

  return (
    <div style={{
      zIndex: 1,
      height: "100%",
      border: "1px solid #CCC",
      background: "#fbfbfb",
      fontSize: "13px",
      color: "#7c7979",
      borderRadius: "5px",
      font: "500 13.3333px Arial",
      "-webkit-font-smoothing": "auto",
      letterSpacing: "0.75px",
      overflow: "hidden"
    }}
      onClick={
        handleCollapsableContent
      }
    >
        <div style={{
          width: "100%",
          height: "45px",
          padding: "0 7px",
          boxShadow: "#0f0f0f 1px 0px 12px -4px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <div>
            Country or Region
          </div>

          <div style={{
            paddingLeft: "10px"
          }}>
            <FontAwesomeIcon icon={["fas", "chevron-down"]} />
          </div>
        </div>

        <div
          id="country-dropdown-collapsable-content-wrapper"
          className="country-dropdown-collapsable-content-wrapper"
          style={{
            height: "100%",
            maxHeight: "0px",
            overflow: "hidden auto",
            transition: "max-height 0.7s"
          }}
        >
          <div style={{
            height: "45px",
            borderTop: "1px solid #CCC",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            Australia
          </div>

          <div style={{
            height: "45px",
            borderTop: "1px solid #CCC",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            Brazil
          </div>

          <div style={{
            height: "45px",
            borderTop: "1px solid #CCC",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            Canada
          </div>

          <div style={{
            height: "45px",
            borderTop: "1px solid #CCC",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            France
          </div>

          <div style={{
            height: "45px",
            borderTop: "1px solid #CCC",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            Germany
          </div>

          <div style={{
            height: "45px",
            borderTop: "1px solid #CCC",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            Italy
          </div>

          <div style={{
            height: "45px",
            borderTop: "1px solid #CCC",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            Spain
          </div>

          <div style={{
            height: "45px",
            borderTop: "1px solid #CCC",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            Sweden
          </div>

          <div style={{
            height: "45px",
            borderTop: "1px solid #CCC",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            United Kingdom
          </div>

          <div style={{
            height: "45px",
            borderTop: "1px solid #CCC",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            United States of America
          </div>
        </div>
      {/* </div> */}
    </div>
    // <select
    //   id="country"
    //   className="country-select-element"
    //   name="country"
    //   style={{ width: "100%", height: "45px", borderRadius: "5px", border: "1px solid #CCC", paddingLeft: "15px" }}
    //   onChange={(e) => props.setRegion(e.target.value)}
    // >
      // <option disabled selected>Country or Region</option>
      // <option className="country-selection-option" value={["Australia", "AU"]}>Australia</option>
      // <option className="country-selection-option" value={["Brazil", "BR"]}>Brazil</option>
      // <option className="country-selection-option" value={["Canada", "CA"]}>Canada</option>
      // <option className="country-selection-option" value={["France", "FR"]}>France</option>
      // <option className="country-selection-option" value={["Germany", "DE"]}>Germany</option>
      // <option className="country-selection-option" value={["Italy", "IT"]}>Italy</option>
      // <option className="country-selection-option" value={["Spain", "ES"]}>Spain</option>
      // <option className="country-selection-option" value={["Sweden", "SE"]}>Sweden</option>
      // <option className="country-selection-option" value={["United Kingdom", "GB"]}>United Kingdom</option>
      // <option className="country-selection-option" value={["United States of America", "US"]}>United States of America</option>
    // </select>
  )
}