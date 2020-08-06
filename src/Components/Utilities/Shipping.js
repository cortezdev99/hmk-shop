import React from 'react'

export default () => {
  // TODO - make span tag in returns section link to the returns page

  const handleShippingToggle = () => {
    const shippingWrapperElmnt = document.getElementById('shipping-wrapper')
    const rotatingElmnt1 = document.getElementById('rotating-plus-minus-1')
    const rotatingElmnt2 = document.getElementById('rotating-plus-minus-2')

    shippingWrapperElmnt.classList.toggle('shipping-wrapper-content-visible')
    rotatingElmnt1.classList.toggle('rotating-plus-minus-rotated')
    rotatingElmnt2.classList.toggle('rotating-plus-minus-rotated')
  }

  return (
    <div className="shipping-container" onClick={handleShippingToggle}>
      <div id="shipping-wrapper" className="shipping-wrapper">
        <div className="shipping-toggle-wrapper">
          <div className="shipping-toggle-header">
            Shipping and Returns
          </div>

          <div className="shipping-toggle-plus-minus-wrapper">
            <div id="rotating-plus-minus-1" className="rotating-plus-minus-1">
              |
            </div>

            <div className="rotating-plus-minus-2" id="rotating-plus-minus-2">
              |
            </div>
          </div>
        </div>

        <div className="shipping-inner-content-wrapper">
          <div>
            <div className="shipping-inner-content-heading">
              Shipping
            </div>

            <div>
              <div className="shipping-inner-content-top-text">
                Processing
              </div>

              <li className="shipping-inner-content-li">
                1-3 Days
              </li>
            </div>

            <div>
              <div className="shipping-inner-content-top-text">
                US Shipping
              </div>

              <li className="shipping-inner-content-li">
                2 - 5 Days
              </li>
            </div>

            <div>
              <div className="shipping-inner-content-top-text">
                International Shipping
              </div>

              <li className="shipping-inner-content-li">
                1 - 2 Weeks
              </li>
            </div>
          </div>

          <div>
            <div className="shipping-inner-content-heading">
              Returns
            </div>

            <li className="shipping-inner-content-bottom-li">
              For information on returns please click <span>here</span>
            </li>
          </div>
        </div>
      </div>
    </div>
  )
}