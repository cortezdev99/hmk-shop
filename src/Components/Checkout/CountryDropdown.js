import React from 'react'

export default (props) => {
  return (
    <select
      id="country"
      className="country-select-element"
      name="country"
      onChange={(e) => props.setRegion(e.target.value)}
    >
      <option disabled selected>Country or Region</option>
      <option className="country-selection-option" value="Australia">Australia</option>
      <option className="country-selection-option" value="Brazil">Brazil</option>
      <option className="country-selection-option" value="Canada">Canada</option>
      <option className="country-selection-option" value="France">France</option>
      <option className="country-selection-option" value="Germany">Germany</option>
      <option className="country-selection-option" value="Italy">Italy</option>
      <option className="country-selection-option" value="Spain">Spain</option>
      <option className="country-selection-option" value="Sweden">Sweden</option>
      <option className="country-selection-option" value="UK">United Kingdom</option>
      <option className="country-selection-option" value="USA">United States of America</option>
    </select>
  )
}