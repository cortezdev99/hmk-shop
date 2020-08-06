import React from 'react'

export default () => {
  const handleShippingToggle = () => {
    const elmnt = document.getElementById('shipping-wrapper')
    elmnt.classList.toggle('shipping-wrapper-inner-content-visible')
  }

  return (
    <div style={{ paddingTop: "80px", width: "100%" }} onClick={handleShippingToggle}>
      <div id="shipping-wrapper" className="shipping-wrapper" style={{ borderTop: "1px solid #CCC", borderBottom: "1px solid #CCC", maxHeight: "52px", overflow: "hidden", transition: "max-height 0.7s" }}>
        <div style={{ display: "flex", width: "100%", justifyContent: "space-between", padding: "1rem", cursor: "pointer" }}>
          <div >
            Shipping and Returns
          </div>

          <div>
            -
          </div>
        </div>

        <div style={{ paddingBottom: "20px" }}>
          <div>
            <div style={{ padding: "1rem" }}>
              Processing
            </div>

            <li style={{ padding: "1rem 2rem" }}>
              1-3 Days
            </li>
          </div>

          <div>
            <div style={{ padding: "1rem" }}>
              US Shipping
            </div>

            <li style={{ padding: "1rem 2rem" }}>
              2 - 5 Days
            </li>
          </div>

          <div>
            <div style={{ padding: "1rem" }}>
              International Shipping
            </div>

            <li style={{ padding: "1rem 2rem" }}>
              1 - 2 Weeks
            </li>
          </div>

          <div>
            <div style={{ padding: "1rem" }}>
              Returns
            </div>

            <li style={{ padding: "1rem 2rem" }}>
              For information on returns please click <span>here</span>
            </li>
          </div>
        </div>
      </div>
    </div>
  )
}