import React from 'react'

export default () => {
  const handleShippingToggle = () => {
    const shippingWrapperElmnt = document.getElementById('shipping-wrapper')
    const rotatingElmnt1 = document.getElementById('rotating-plus-minus-1')
    const rotatingElmnt2 = document.getElementById('rotating-plus-minus-2')

    shippingWrapperElmnt.classList.toggle('shipping-wrapper-content-visible')
    rotatingElmnt1.classList.toggle('rotating-plus-minus-rotated')
    rotatingElmnt2.classList.toggle('rotating-plus-minus-rotated')
  }

  return (
    <div style={{ paddingTop: "80px", width: "100%" }} onClick={handleShippingToggle}>
      <div id="shipping-wrapper" className="shipping-wrapper" style={{ borderTop: "1px solid #CCC", borderBottom: "1px solid #CCC", maxHeight: "52px", overflow: "hidden", transition: "max-height 0.7s" }}>
        <div style={{ display: "flex", width: "100%", justifyContent: "space-between", padding: "1rem", cursor: "pointer" }}>
          <div >
            Shipping and Returns
          </div>

          <div style={{ position: "relative" }}>
            <div id="rotating-plus-minus-1" className="rotating-plus-minus-1" style={{ transition: "0.7s", position: "absolute", bottom: "1px", left: "1px", transform: "rotate(90deg)" }}>
              |
            </div>

            <div className="rotating-plus-minus-2" id="rotating-plus-minus-2" style={{ transition: "0.7s", position: "absolute", transform: "rotate(180deg)" }}>
              |
            </div>
          </div>
        </div>

        <div style={{ paddingBottom: "20px" }}>
          <div>
            <div style={{ padding: "1rem", fontSize: '18px', fontWeight: "600" }}>
              Shipping
            </div>

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
          </div>

          <div>
            <div style={{ padding: "1rem", fontSize: '18px', fontWeight: "600" }}>
              Returns
            </div>

            <li style={{ padding: "1rem 2rem", paddingBottom: "0px" }}>
              For information on returns please click <span>here</span>
            </li>
          </div>
        </div>
      </div>
    </div>
  )
}