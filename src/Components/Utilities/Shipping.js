import React from 'react'

export default () => {
  const handleShippingToggle = () => {
    const elmnt = document.getElementById('shipping-wrapper')
    const elmnt2 = document.getElementById('rotated-elmnt')
    const elmnt3 = document.getElementById('rotated-elmnt-2')

    elmnt.classList.toggle('shipping-wrapper-inner-content-visible')
    elmnt2.classList.toggle('rotated-elmnt--collapsed')
    elmnt3.classList.toggle('rotated-elmnt--collapsed')
  }

  return (
    <div style={{ paddingTop: "80px", width: "100%" }} onClick={handleShippingToggle}>
      <div id="shipping-wrapper" className="shipping-wrapper" style={{ borderTop: "1px solid #CCC", borderBottom: "1px solid #CCC", maxHeight: "52px", overflow: "hidden", transition: "max-height 0.7s" }}>
        <div style={{ display: "flex", width: "100%", justifyContent: "space-between", padding: "1rem", cursor: "pointer" }}>
          <div >
            Shipping and Returns
          </div>

          <div style={{ position: "relative" }}>
            <div id="rotated-elmnt-2" className="rotated-elmnt2" style={{ transition: "0.7s", position: "absolute", bottom: "1px", left: "1px", transform: "rotate(90deg)" }}>
              |
            </div>

            <div className="rotated-elmnt" id="rotated-elmnt" style={{ transition: "0.7s", position: "absolute", transform: "rotate(180deg)" }}>
              |
            </div>
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