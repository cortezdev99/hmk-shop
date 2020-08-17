import React, { useEffect, useState, useContext } from 'react';
import CartContext from '../../Contexts/CartContext';
import CountryDropdown from './CountryDropdown';
import { Link, Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Shipping from '../Utilities/Shipping';
import Payment from './Payment';
import { firestore } from '../../Config/fbConfig'
import {CardElement, useElements, useStripe} from '@stripe/react-stripe-js';
// import axios from 'axios'


export default () => {
  // TODO Add Free Shipping Logic On Orders Over $100
  // Todo Add Logic To Add Discount
  // var stripe = Stripe(process.env.REACT_APP_PUBLISHABLE_KEY);
  const [ email, setEmail ] = useState("")
  const [ firstName, setFirstName ] = useState("")
  const [ lastName, setLastName ] = useState("")
  const [ address, setAddress ] = useState("")
  const [ address2, setAddress2 ] = useState("")
  const [ city, setCity ] = useState("")
  const [ region, setRegion ] = useState([])
  const [ state, setState ] = useState("")
  const [ zip, setZip ] = useState("")
  const [ phone, setPhone ] = useState("")
  const [ subtotal, setSubtotal ] = useState(0)
  const stripe = useStripe();
  const elements = useElements();

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

  const handlePurchase = async (ev) => {
    ev.preventDefault();

    const billingDetails = {
      email,
      phone,
      name: `${firstName} ${lastName}`,
      address: {
        line1: address,
        line2: address2,
        country: region.split(',')[1],
        state,
        city,
        postal_code: zip
      }
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
      billing_details: billingDetails
    });

    if (error) {
      console.log(error)
    } else {
      const { id } = paymentMethod;
      let test = []
      products.map((product) => {
        const productId = product[0].product.id
        const productPrice = product[0].product.price
        const title = product[0].product.title
        const quantity = product[4].quantity
        const productColor = product[2].color
        const productSize = product[1].size
        test.push({ productId, title, productPrice, quantity, productColor, productSize })
      })

      try {
        firestore.collection('payments').doc(id).set({
          paymentMethod,
          test
        })
      } catch (error) {
        console.log(error)
      }
    }


    // stripe.createPaymentMethod({
    //   type: 'card',
    //   card: elements.getElement(CardElement),
    //   billing_details: billingDetails
    // }).then((resp) => {
    //   if (resp.error) {
    //     console.log(resp.error)
    //   } else {
    //     console.log(resp.paymentMethod)
    //   }
    // }).catch((err) => {
    //   console.log(err)
    // })
  }

  const cardElementOptions = {
    style: {
      base: {
        
      },
      invalid: {

      },
      complete: {
        
      }
    },
    hidePostalCode: true
  }

  return (
    <div className="checkout-container"  id="checkout-container">
      <div className="checkout-banner-image-wrapper">
        <img
          className="checkout-banner-image"
          src="https://via.placeholder.com/1900x646"
          alt="bannerImage"
        />
      </div>

      <div className="checkout-wrapper">
        <div className="checkout-left-column">
            <div className="checkout-express-checkout-wrapper">
              <div className="checkout-express-checkout-header-wrapper">
                <span className="checkout-express-checkout-header-border"></span>
                <span className="checkout-express-checkout-header">Express Checkout</span>
                <span className="checkout-express-checkout-header-border"></span>
              </div>

              <div className="checkout-express-checkout-btns-wrapper">
                <div className="checkout-express-checkout-btn-wrapper">
                  <button className="checkout-express-checkout-btn">Google Pay</button>
                </div>

                <div className="checkout-express-checkout-btn-wrapper">
                  <button className="checkout-express-checkout-btn">Apple Pay</button>
                </div>

                <div className="checkout-express-checkout-btn-wrapper">
                  <button className="checkout-express-checkout-btn">Amazon Pay</button>
                </div>

                <div className="checkout-express-checkout-btn-wrapper">
                  <button className="checkout-express-checkout-btn">Paypal</button>
                </div>
              </div>
            </div>

            <div className="checkout-options-seperator-wrapper">
              <span className="checkout-options-seperator-border"></span>
              <span className="checkout-options-seperator-header">OR</span>
              <span className="checkout-options-seperator-border"></span>
            </div>

            <div className="checkout-contact-info-wrapper">
              <div className="checkout-contact-info-header">Contact Information</div>
                <div className="checkout-contact-info-input-wrapper">
                  <input
                    className="checkout-input"
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="checkout-contact-info-phone-input-wrapper">
                  <input
                    className="checkout-input"
                    placeholder="Phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
            </div>

            <div className="checkout-shipping-info-wrapper">
              <div className="checkout-shipping-info-header">Shipping address</div>

              <div className="checkout-shipping-info-name-wrapper">
                <input
                  className="checkout-input"
                  placeholder="First name"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />

                <input
                  className="checkout-input"
                  placeholder="Last name"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>

              <div className="checkout-shipping-info-address-one-wrapper  checkout-input-padding">
                <input
                    className="checkout-input"
                    placeholder="Address"
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
              </div>

              <div className="checkout-shipping-info-address-two-wrapper checkout-input-padding">
                <input
                    className="checkout-input"
                    placeholder="Apartment, Suite, etc. (optional)"
                    type="text"
                    value={address2}
                    onChange={(e) => setAddress2(e.target.value)}
                  />
              </div>

              <div className="checkout-shipping-info-city-wrapper checkout-input-padding">
                <input
                    className="checkout-input"
                    placeholder="City"
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
              </div>

                <div className="checkout-shipping-info-region-state-city-wrapper checkout-input-padding">
                  <CountryDropdown 
                    setRegion={(country) => setRegion(country)}
                  />

                  <input
                    className="checkout-input"
                    placeholder="State"
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  />

                  <input
                    className="checkout-input"
                    placeholder="Zip code"
                    type="text"
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                  />
                </div>
            </div>

            <div style={{  paddingTop: '80px' }}>
                <div style={{ paddingBottom: '20px', fontSize: '18px' }}>
                  Card Information
                </div>

                <div style={{ height: "50px", width: "100%", border: "1px solid #1d1d1d", borderRadius: "5px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <CardElement
                    options={cardElementOptions} 
                  />
                </div>
            </div>

            <div className="checkout-left-column-btns-wrapper">
              <Link
                className="checkout-left-column-left-link"
                to="/"
                onClick={() => {
                  const rootElement = document.getElementById('app-container')
                  const navbarElement = document.getElementById('navbar-wrapper-id')
                  
                  rootElement.classList.toggle('no-scroll-margin')
                  navbarElement.classList.toggle('hidden-nav')
                }}
              >
                <span className="checkout-left-column-link-icon"><FontAwesomeIcon icon="arrow-left" /></span> Return to home
              </Link>

              <div>
                <button
                  className="checkout-left-column-right-link"
                  style={{ display: "flex", justifyContent: "space-evenly", padding: "0 3rem", border: "1px solid #1d1d1d", cursor: 'pointer' }}
                  onClick={handlePurchase}
                  // disabled={stripe}
                >
                  <div>Purchase </div>
                  {/* TODO USE FONT AWESOME ICON BULLET POINT */}
                  <div>${subtotal}</div>
                </button>
              </div>
          </div>
        </div>

        <div className="checkout-right-column-wrapper">
          <div className="checkout-products-wrapper">
            {
              products.map((product, productIdx) => {
                return (
                  <div className="checkout-product-wrapper" key={productIdx}>
                    <div className="checkout-product-image-container">
                      <div className="checkout-product-image-wrapper">
                        <img
                          src={product[3].image}
                          alt="productImage"
                          className="checkout-product-image"
                        />

                        <div className="checkout-product-image-quantity-wrapper">
                          <div className="checkout-product-image-quantity">
                            {product[4].quantity}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="checkout-product-info-wrapper">
                      <div className="checkout-product-title">
                        {product[0].product.title}
                      </div>

                      <div className="checkout-product-color">
                        {product[2].color} / {product[1].size.toUpperCase()}
                      </div>
                    </div>

                    <div className="checkout-product-price">
                      ${product[0].product.price * product[4].quantity}
                    </div>
                  </div>
                )
              })
            }
          </div>

          <div className="checkout-discount-code-wrapper">
            <div className="checkout-discount-input-wrapper">
              <input
                className="checkout-input"
                placeholder="Discount or promo code"
                type="text"
              />
            </div>

            <div className="checkout-discount-btn-wrapper">
              <button
                className="checkout-discount-btn"
              >
                Apply
              </button>
            </div>
          </div>

          <div className="checkout-total-calculations-wrapper">
            <div className="checkout-subtotal-wrapper">
              <div className="checkout-subtotal-header">
                Subtotal
              </div>

              <div className="checkout-subtotal-price">
                ${subtotal}
              </div>
            </div>

            <div className="checkout-shipping-wrapper">
              <div className="checkout-shipping-header">
                Shipping
              </div>

              <div className="checkout-shipping-price">
                { region === 'USA' ? "$6" : region === "" ? "Not calculated yet." : "$8" }
              </div>
            </div>
          </div>

          <div className="checkout-total-wrapper">
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