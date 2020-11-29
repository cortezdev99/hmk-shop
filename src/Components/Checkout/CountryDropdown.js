import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default (props) => {
  const [ countries, setCountries ] = useState([
    {
      "country": "Australia",
      "alpha_2_country_code": "AU"
     },
     {
      "country": "Brazil",
      "alpha_2_country_code": "BR"
     },
     {
      "country": "Canada",
      "alpha_2_country_code": "CA"
     },
     {
      "country": "France",
      "alpha_2_country_code": "FR"
     },
     {
      "country": "Italy",
      "alpha_2_country_code": "IT"
     },
     {
      "country": "Spain",
      "alpha_2_country_code": "ES"
     },
     {
      "country": "Sweden",
      "alpha_2_country_code": "SE"
     },
     {
      "country": "United Kingdom",
      "alpha_2_country_code": "GB"
     },
     {
      "country": "United States of America",
      "alpha_2_country_code": "US"
     }
  ])

  const el = document.getElementById("country-dropdown-collapsable-content-wrapper")
  const el3 = document.getElementById("country-dropdown-chevron")

  const handleSettingSelectedCountry = (idxOfCountry) => {
    props.setRegion([
      countries[idxOfCountry].country,
      countries[idxOfCountry].alpha_2_country_code
    ])
    
    if (el !== null && el3 !== null) {
      props.setAddShippingMaxHeight(props.addShippingMaxHeight - 180)
      el.classList.toggle('country-dropdown-collapsable-content-showing')
      el3.classList.toggle('country-dropdown-chevron-rotated')
    }
  }

  const handleCollapsableContent = () => {
    if (el !== null && el3 !== null) {
      if (el.classList.contains('country-dropdown-collapsable-content-showing')) {
        props.setAddShippingMaxHeight(props.addShippingMaxHeight - 180)
      } else {
        props.setAddShippingMaxHeight(props.addShippingMaxHeight + 180)
      }

      el.classList.toggle('country-dropdown-collapsable-content-showing')
      el3.classList.toggle('country-dropdown-chevron-rotated')
    }
  }

  return (
    <div style={{
      zIndex: 1,
      height: "100%",
      // border: "1px solid #CCC",
      border: `${props.noRegionErr && props.region.length === 0 ? "1px solid #FF0000" : "1px solid #CCC"}`,
      background: "#fbfbfb",
      fontSize: "13px",
      color: "#7c7979",
      borderRadius: "5px",
      font: "500 13.3333px Arial",
      WebkitFontSmoothing: "auto",
      letterSpacing: "0.75px",
      overflow: "hidden"
    }}
    >
        <div 
          style={{
          width: "100%",
          height: "45px",
          padding: "0 7px",
          boxShadow: "-157px 5px 25px -14px rgba(50, 50, 50, 0.75), 147px 5px 25px -14px rgba(50, 50, 50, 0.75)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer"
          }}

          onClick={
            handleCollapsableContent
          }
        >
          <div style={{
            paddingRight: "10px"
          }}>
            {
              props.region.length === 0 ? "Country or Region" : <span style={{ color: "#1d1d1d" }}>{props.region[0]}</span>
            }
          </div>

          <div
            id="country-dropdown-chevron"
            className="country-dropdown-chevron"
            style={{
            transition: "transform 0.7s ease-in-out"
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

          {
            countries.map((country, idxOfCountry) => {
              return (
              <div 
                key={idxOfCountry}
                style={{
                  height: "45px",
                  borderTop: "1px solid #CCC",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer"
                }} 

                onClick={ () => handleSettingSelectedCountry(idxOfCountry) }
              >
                {
                  country.country
                }
              </div>
              )
            })
          }
        </div>
    </div>
  )
}