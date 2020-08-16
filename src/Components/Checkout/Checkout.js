import React, { useEffect, useState, useContext } from 'react'
import CartContext from '../../Contexts/CartContext'
import CountryDropdown from './CountryDropdown'
import { Link, Redirect } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Shipping from '../Utilities/Shipping'

export default () => {
  // TODO Add Free Shipping Logic On Orders Over $100
  // Todo Add Logic To Add Discount
  const [ email, setEmail ] = useState("")
  const [ firstName, setFirstName ] = useState("")
  const [ address, setAddress ] = useState("")
  const [ address2, setAddress2 ] = useState("")
  const [ city, setCity ] = useState("")
  const [ region, setRegion ] = useState("")
  const [ state, setState ] = useState("")
  const [ zip, setZip ] = useState("")
  const [ phone, setPhone ] = useState("")
  const [ subtotal, setSubtotal ] = useState(0)

  const {
    products
  } = useContext(CartContext)

  if (products.length < 1) {
    return <Redirect to="/" />
  }

  useEffect(() => {
    const rootElement = document.getElementById('app-container')
    const navbarElement = document.getElementById('navbar-wrapper-id')
    
    rootElement.classList.toggle('no-scroll-margin')
    navbarElement.classList.toggle('hidden-nav')

    rootElement.scrollIntoView({
      behavior: "smooth",
      block: "start"
    }, 500)

    const subtotal = products.reduce((accum, currentVal) => {
      return accum += currentVal[4].quantity * currentVal[0].product.price
    }, 0)
    
    setSubtotal(subtotal)
  }, [products])

  return (
    <div className="checkout-container"  id="checkout-container" style={{ paddingBottom: "80px" }}>
      <div className="checkout-banner-image-wrapper">
        <img
          className="checkout-banner-image"
          src="https://via.placeholder.com/1900x646"
          style={{ height: "40%", maxHeight: "200px", backgroundSize: "cover", width: "100%" }}
          alt="bannerImage"
        />
      </div>

      <div className="checkout-wrapper" style={{ padding: "0 80px", display: "grid", gridTemplateColumns: "1.5fr 1fr", gridGap: "80px" }}>
        <div className="checkout-left-column">
            <div className="checkout-express-checkout-wrapper" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%", paddingTop: "72px" }}>
              <div className="checkout-express-checkout-header-wrapper" style={{ width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}>
                <span className="checkout-express-checkout-header-border" style={{ marginTop: "8px", border: "1px solid #CCC", borderBottom: "none", borderRight: "none" }}></span>
                <span className="checkout-express-checkout-header" style={{ textAlign: "center" }}>Express Checkout</span>
                <span className="checkout-express-checkout-header-border" style={{ marginTop: "8px", border: "1px solid #CCC", borderBottom: "none", borderLeft: "none" }}></span>
              </div>

              <div className="checkout-express-checkout-btns-wrapper" style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid #CCC", borderTop: "none", padding: "20px" }}>
                <div className="checkout-express-checkout-btn-wrapper" style={{ paddingLeft: "5px", paddingRight: "5px", width: "140px" }}>
                  <button className="checkout-express-checkout-btn" style={{ height: "40px", width: "100%" }}>Google Pay</button>
                </div>

                <div className="checkout-express-checkout-btn-wrapper" style={{ paddingLeft: "5px", paddingRight: "5px", width: "140px" }}>
                  <button className="checkout-express-checkout-btn" style={{ height: "40px", width: "100%" }}>Apple Pay</button>
                </div>

                <div className="checkout-express-checkout-btn-wrapper" style={{ paddingLeft: "5px", paddingRight: "5px", width: "140px" }}>
                  <button className="checkout-express-checkout-btn" style={{ height: "40px", width: "100%" }}>Amazon Pay</button>
                </div>

                <div className="checkout-express-checkout-btn-wrapper" style={{ paddingLeft: "5px", paddingRight: "5px", width: "140px" }}>
                  <button className="checkout-express-checkout-btn" style={{ height: "40px", width: "100%" }}>Paypal</button>
                </div>
              </div>
            </div>

            <div className="checkout-options-seperator-wrapper" style={{ paddingTop: "80px", display: "grid", gridTemplateColumns: "2fr 1fr 2fr" }}>
              <span className="checkout-options-seperator-border" style={{ marginTop: "8px", borderTop: "1px solid #CCC" }}></span>
              <span className="checkout-options-seperator-header" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>OR</span>
              <span className="checkout-options-seperator-border" style={{ marginTop: "8px", borderTop: "1px solid #CCC" }}></span>
            </div>

            <div className="checkout-contact-info-wrapper" style={{ width: "100%", paddingTop: "80px" }}>
              <div className="checkout-contact-info-header" style={{ fontSize: "18px" }}>Contact Information</div>
                <div className="checkout-contact-info-input-wrapper" style={{ paddingTop: "20px" }}>
                  <input
                    className="checkout-input"
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ width: "100%", height: "50px" }}
                  />
                </div>

                <div className="checkout-contact-info-input-wrapper" style={{ paddingTop: "20px", display: "flex" }}>
                  <input
                    className="checkout-input"
                    placeholder="Phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={{ width: "100%", height: "50px" }}
                  />
                </div>
            </div>

            <div className="checkout-shipping-info-wrapper" style={{ width: "100%", paddingTop: "80px" }}>
              <div className="checkout-shipping-info-header" style={{ paddingBottom: "20px", fontSize: "18px" }}>Shipping address</div>

              <div className="checkout-shipping-info-name-wrapper" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", columnGap: "20px" }}>
                <input
                  className="checkout-input"
                  placeholder="First name"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  style={{ width: "100%", height: "50px" }}
                />

                <input
                  className="checkout-input"
                  placeholder="Last name"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  style={{ width: "100%", height: "50px" }}
                />
              </div>

              <div className="checkout-shipping-info-address-one-wrapper  checkout-input-padding" style={{ paddingTop: "20px" }}>
                <input
                    className="checkout-input"
                    placeholder="Address"
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    style={{ width: "100%", height: "50px" }}
                  />
              </div>

              <div className="checkout-shipping-info-address-two-wrapper checkout-input-padding" style={{ paddingTop: "20px" }}>
                <input
                    className="checkout-input"
                    placeholder="Apartment, Suite, etc. (optional)"
                    type="text"
                    value={address2}
                    onChange={(e) => setAddress2(e.target.value)}
                    style={{ width: "100%", height: "50px" }}
                  />
              </div>

              <div className="checkout-shipping-info-city-wrapper checkout-input-padding" style={{ paddingTop: "20px" }}>
                <input
                    className="checkout-input"
                    placeholder="City"
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    style={{ width: "100%", height: "50px" }}
                  />
              </div>

                <div className="checkout-shipping-info-region-state-city-wrapper checkout-input-padding" style={{ paddingTop: "20px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", columnGap: "20px" }}>
                  <CountryDropdown 
                    setRegion={(country) => setRegion(country)}
                  />

                  <input
                    className="checkout-input"
                    placeholder="State"
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    style={{ width: "100%", height: "50px" }}
                  />

                  <input
                    className="checkout-input"
                    placeholder="Zip code"
                    type="text"
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    style={{ width: "100%", height: "50px" }}
                  />
                </div>
            </div>

            <div className="checkout-left-column-btns-wrapper" style={{ height: "70px", paddingTop: "20px", display: "flex", justifyContent: "space-between" }}>
              <Link
                className="checkout-left-column-left-link"
                style={{ display: "flex", justifyContent: "center", alignItems: "center", textDecoration: "none", color: "#1d1d1d" }}
                to="/"
                onClick={() => {
                  const rootElement = document.getElementById('app-container')
                  const navbarElement = document.getElementById('navbar-wrapper-id')
                  
                  rootElement.classList.toggle('no-scroll-margin')
                  navbarElement.classList.toggle('hidden-nav')
                }}
              >
                <span className="checkout-left-column-link-icon" style={{ paddingRight: "20px", fontSize: "14px" }}><FontAwesomeIcon icon="arrow-left" /></span> Return to home
              </Link>

              <div>
                <Link
                  className="checkout-left-column-right-link"
                  style={{ height: "100%", width: "100%", padding: "1em", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", color: "#1d1d1d", backgroundColor: "#45b3e0", borderRadius: "5px" }}
                  to={{
                    pathname: `/checkout/payment`,
                    paymentProps: {
                      products: products,
                      shipping: {
                        firstName,
                        address,
                        address2,
                        city,
                        region,
                        state,
                        zip
                      },
                      contact: {
                        phone,
                        email
                      },
                      total: {
                        total: region === "USA" ? subtotal + 6 : subtotal + 8
                      }
                    } 
                  }}
                >
                  Continue to payment
                </Link>
              </div>
            </div>
        </div>

        <div className="checkout-right-column-wrapper" style={{ paddingTop: "40px" }}>
          <div className="checkout-products-wrapper">
            {
              products.map((product, productIdx) => {
                return (
                  <div className="checkout-product-wrapper" key={productIdx} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", columnGap: "5px", padding: "40px 0", borderBottom: "1px solid #CCC" }}>
                    <div className="checkout-product-image-container" style={{ display: "flex", justifyContent: "center" }}>
                      <div className="checkout-product-image-wrapper" style={{ width: "100px", height: "100px", display: "flex" }}>
                        <img
                          src={product[3].image}
                          style={{ width: "100%", height: "100%" }}
                          alt="productImage"
                          className="checkout-product-image"
                        />

                        <div className="checkout-product-image-quantity-wrapper" style={{ position: "relative" }}>
                          <div className="checkout-product-image-quantity" style={{ width: "25px", height: "25px", position: "absolute", top: "-12px", right: "-12px", backgroundColor: "rgba(114,114,114,0.9)", color: "white", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            {product[4].quantity}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="checkout-product-info-wrapper" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                      <div className="checkout-product-title" style={{ textAlign: "center" }}>
                        {product[0].product.title}
                      </div>

                      <div className="checkout-product-color" style={{ textAlign: "center" }}>
                        {product[2].color} / {product[1].size.toUpperCase()}
                      </div>
                    </div>

                    <div className="checkout-product-price" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                      ${product[0].product.price * product[4].quantity}
                    </div>
                  </div>
                )
              })
            }
          </div>

          <div className="checkout-discount-code-wrapper" style={{ display: "grid", gridTemplateColumns: "2fr 1fr", columnGap: "20px", padding: "40px 0", borderBottom: "1px solid #CCC" }}>
            <div className="checkout-discount-input-wrapper">
              <input
                className="checkout-input"
                placeholder="Discount or promo code"
                type="text"
                style={{ width: "100%", height: "50px" }}
              />
            </div>

            <div className="checkout-discount-btn-wrapper">
              <button
                className="checkout-discount-btn"
                style={{ width: "100%", height: "50px" }}
              >
                Apply
              </button>
            </div>
          </div>

          <div className="checkout-total-calculations-wrapper" style={{ padding: "40px 0", borderBottom: "1px solid #CCC" }}>
            <div className="checkout-subtotal-wrapper" style={{ display: "flex", justifyContent: "space-between", paddingBottom: "20px" }}>
              <div className="checkout-subtotal-header" style={{ fontSize: "14px" }}>
                Subtotal
              </div>

              <div className="checkout-subtotal-price">
                ${subtotal}
              </div>
            </div>

            <div className="checkout-shipping-wrapper" style={{ display: "flex", justifyContent: "space-between" }}>
              <div className="checkout-shipping-header" style={{ fontSize: "14px" }}>
                Shipping
              </div>

              <div className="checkout-shipping-price">
                { region === 'USA' ? "$6" : region === "" ? "Not calculated yet." : "$8" }
              </div>
            </div>
          </div>

          <div className="checkout-total-wrapper" style={{ paddingTop: "40px", display: "flex", justifyContent: "space-between" }}>
            <div className="checkout-total-header">
              Total
            </div>

            <div className="checkout-total-price">
              {region === "USA" ? `$${subtotal + 6}` : region === "" ? "Not calculated yet." : `$${subtotal + 8}`}
            </div>
          </div>

          <div >
            <Shipping paddingReAlign={true} />
          </div>
        </div>
      </div>
    </div>
  )
}