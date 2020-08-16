import React, { useEffect, useState, useContext } from 'react'
import CartContext from '../../Contexts/CartContext'
import CountryDropdown from './CountryDropdown'
import { Link, Redirect } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
    <div id="checkout-container" style={{ paddingBottom: "80px" }}>
      <div>
        <img
          src="https://via.placeholder.com/1900x646"
          style={{ height: "40%", maxHeight: "200px", backgroundSize: "cover", width: "100%" }}
          alt="bannerImage"
        />
      </div>

      <div style={{ padding: "0 80px", display: "grid", gridTemplateColumns: "1.5fr 1fr", gridGap: "80px" }}>
        <div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%", paddingTop: "72px" }}>
              <div style={{ width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}>
                <span style={{ marginTop: "8px", border: "1px solid #CCC", borderBottom: "none", borderRight: "none" }}></span>
                <span style={{ textAlign: "center" }}>Express Checkout</span>
                <span style={{ marginTop: "8px", border: "1px solid #CCC", borderBottom: "none", borderLeft: "none" }}></span>
              </div>

              <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid #CCC", borderTop: "none", padding: "20px" }}>
                <div style={{ paddingLeft: "5px", paddingRight: "5px", width: "140px" }}>
                  <button style={{ height: "40px", width: "100%" }}>Google Pay</button>
                </div>

                <div style={{ paddingLeft: "5px", paddingRight: "5px", width: "140px" }}>
                  <button style={{ height: "40px", width: "100%" }}>Apple Pay</button>
                </div>

                <div style={{ paddingLeft: "5px", paddingRight: "5px", width: "140px" }}>
                  <button style={{ height: "40px", width: "100%" }}>Amazon Pay</button>
                </div>

                <div style={{ paddingLeft: "5px", paddingRight: "5px", width: "140px" }}>
                  <button style={{ height: "40px", width: "100%" }}>Paypal</button>
                </div>
              </div>
            </div>

            <div style={{ paddingTop: "80px", display: "grid", gridTemplateColumns: "2fr 1fr 2fr" }}>
              <span style={{ marginTop: "8px", borderTop: "1px solid #CCC" }}></span>
              <span style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>OR</span>
              <span style={{ marginTop: "8px", borderTop: "1px solid #CCC" }}></span>
            </div>

            <div style={{ width: "100%", paddingTop: "80px" }}>
              <div style={{ fontSize: "18px" }}>Contact Information</div>
                <div style={{ paddingTop: "20px" }}>
                  <input
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ width: "100%", height: "50px" }}
                  />
                </div>

                <div style={{ paddingTop: "20px", display: "flex" }}>
                  <input
                    placeholder="Phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={{ width: "100%", height: "50px" }}
                  />
                </div>
            </div>

            <div style={{ width: "100%", paddingTop: "80px" }}>
              <div style={{ paddingBottom: "20px", fontSize: "18px" }}>Shipping address</div>

              <div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", columnGap: "20px" }}>
                  <input
                    placeholder="First name"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    style={{ width: "100%", height: "50px" }}
                  />

                  <input
                    placeholder="Last name"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    style={{ width: "100%", height: "50px" }}
                  />
                </div>
              </div>

              <div style={{ paddingTop: "20px" }}>
                <input
                    placeholder="Address"
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    style={{ width: "100%", height: "50px" }}
                  />
              </div>

              <div style={{ paddingTop: "20px" }}>
                <input
                    placeholder="Apartment, Suite, etc. (optional)"
                    type="text"
                    value={address2}
                    onChange={(e) => setAddress2(e.target.value)}
                    style={{ width: "100%", height: "50px" }}
                  />
              </div>

              <div style={{ paddingTop: "20px" }}>
                <input
                    placeholder="City"
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    style={{ width: "100%", height: "50px" }}
                  />
              </div>

                <div style={{ paddingTop: "20px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", columnGap: "20px" }}>
                  <CountryDropdown 
                    setRegion={(country) => setRegion(country)}
                  />

                  <input
                    placeholder="State"
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    style={{ width: "100%", height: "50px" }}
                  />

                  <input
                    placeholder="Zip code"
                    type="text"
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    style={{ width: "100%", height: "50px" }}
                  />
                </div>
            </div>

            <div style={{ height: "70px", paddingTop: "20px", display: "flex", justifyContent: "space-between" }}>
              <Link
                style={{ display: "flex", justifyContent: "center", alignItems: "center", textDecoration: "none", color: "#1d1d1d" }}
                to="/"
                onClick={() => {
                  const rootElement = document.getElementById('app-container')
                  const navbarElement = document.getElementById('navbar-wrapper-id')
                  
                  rootElement.classList.toggle('no-scroll-margin')
                  navbarElement.classList.toggle('hidden-nav')
                }}
              >
                <span style={{ paddingRight: "5px", fontSize: "14px" }}><FontAwesomeIcon icon="arrow-left" /></span> Return to home
              </Link>

              <div>
                <Link
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

        <div style={{ paddingTop: "40px" }}>
          <div>
            {
              products.map((product, productIdx) => {
                return (
                  <div key={productIdx} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", columnGap: "5px", padding: "40px 0", borderBottom: "1px solid #CCC" }}>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <div style={{ width: "100px", height: "100px", display: "flex" }}>
                        <img
                          src={product[3].image}
                          style={{ width: "100%", height: "100%" }}
                          alt="productImage"
                        />

                        <div style={{ position: "relative" }}>
                          <div style={{ width: "25px", height: "25px", position: "absolute", top: "-12px", right: "-12px", backgroundColor: "rgba(114,114,114,0.9)", color: "white", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            {product[4].quantity}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                      <div style={{ textAlign: "center" }}>
                        {product[0].product.title}
                      </div>

                      <div style={{ textAlign: "center" }}>
                        {product[2].color} / {product[1].size.toUpperCase()}
                      </div>
                    </div>

                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                      ${product[0].product.price * product[4].quantity}
                    </div>
                  </div>
                )
              })
            }
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", columnGap: "20px", padding: "40px 0", borderBottom: "1px solid #CCC" }}>
            <div>
              <input
                placeholder="Discount or promo code"
                type="text"
                style={{ width: "100%", height: "50px" }}
              />
            </div>

            <div>
              <button
                style={{ width: "100%", height: "50px" }}
              >
                Apply
              </button>
            </div>
          </div>

          <div style={{ padding: "40px 0", borderBottom: "1px solid #CCC" }}>
            <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "20px" }}>
              <div style={{ fontSize: "14px" }}>
                Subtotal
              </div>

              <div>
                ${subtotal}
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ fontSize: "14px" }}>
                Shipping
              </div>

              <div>
                { region === 'USA' ? "$6" : region === "" ? "Not calculated yet." : "$8" }
              </div>
            </div>
          </div>

          <div style={{ paddingTop: "40px", display: "flex", justifyContent: "space-between" }}>
            <div>
              Total
            </div>

            <div>
              {region === "USA" ? `$${subtotal + 6}` : region === "" ? "Not calculated yet." : `$${subtotal + 8}`}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}