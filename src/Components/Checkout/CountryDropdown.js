import React from 'react'

export default (props) => {
  return (
    <select
      id="country"
      className="country-select-element"
      name="country"
      style={{ borderRadius: "5px", border: "1px solid #1d1d1d", paddingLeft: "15px" }}
      onChange={(e) => props.setRegion(e.target.value)}
    >
      <option disabled selected>Country or Region</option>
      <option className="country-selection-option" value={["Australia", "AU"]}>Australia</option>
      <option className="country-selection-option" value={["Brazil", "BR"]}>Brazil</option>
      <option className="country-selection-option" value={["Canada", "CA"]}>Canada</option>
      <option className="country-selection-option" value={["France", "FR"]}>France</option>
      <option className="country-selection-option" value={["Germany", "DE"]}>Germany</option>
      <option className="country-selection-option" value={["Italy", "IT"]}>Italy</option>
      <option className="country-selection-option" value={["Spain", "ES"]}>Spain</option>
      <option className="country-selection-option" value={["Sweden", "SE"]}>Sweden</option>
      <option className="country-selection-option" value={["United Kingdom", "GB"]}>United Kingdom</option>
      <option className="country-selection-option" value={["United States of America", "US"]}>United States of America</option>
    </select>
  )
}