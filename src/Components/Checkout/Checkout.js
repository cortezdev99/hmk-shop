import React, { useEffect, useState, useContext } from 'react';
import CartContext from '../../Contexts/CartContext';
import CountryDropdown from './CountryDropdown';
import { Link, Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Shipping from '../Utilities/Shipping';
import Payment from './Payment';
import { firestore } from '../../Config/fbConfig'
import 'firebase/auth'
import firebase from 'firebase/app';
import {CardElement, useElements, useStripe} from '@stripe/react-stripe-js';
// import axios from 'axios'


export default () => {
  // TODO Add Free Shipping Logic On Orders Over $100
  // Todo Add Logic To Add Discount
  const [ email, setEmail ] = useState("")
  const [ firstName, setFirstName ] = useState("")
  const [ lastName, setLastName ] = useState("")
  const [ address, setAddress ] = useState("")
  const [ address2, setAddress2 ] = useState("")
  const [ city, setCity ] = useState("")
  const [ region, setRegion ] = useState([])
  const [ state, setState ] = useState("")
  const [ zip, setZip ] = useState("")
  const [ noFirstNameErr, setNoFirstNameErr ] = useState(false)
  const [ noLastNameErr, setNoLastNameErr ] = useState(false)
  const [ noAddressErr, setNoAddressErr ] = useState(false)
  const [ noCityErr, setNoCityErr ] = useState(false)
  const [ noRegionErr, setNoRegionErr ] = useState(false)
  const [ noStateErr, setNoStateErr ] = useState(false)
  const [ noZipErr, setNoZipErr ] = useState(false)
  const [ phone, setPhone ] = useState("")
  const [ subtotal, setSubtotal ] = useState(0)
  const [ cardholderName, setCardholderName ] = useState("")
  const [ customerData, setCustomerData ] = useState({})
  const [ billingAddresses, setBillingAddresses ] = useState([])
  const [ billingAddress, setBillingAddress ] = useState(false)
  const [ activeBillingAddress, setActiveBillingAddress ] = useState(false)
  const [ noBillingAddresses, setNoBillingAddresses ] = useState(false)
  const [ userUID, setUserUID ] = useState("");
  const [ paymentMethods, setPaymentMethods ] = useState([]);
  const [ paymentMethod, setPaymentMethod ] = useState(false)
  const [ noPaymentMethods, setNoPaymentMethods ] = useState(false)
  const [ activePaymentMethod, setActivePaymentMethod ] = useState(false)
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
    
    if (userUID.length === 0) {
      setUserUID(firebase.auth().currentUser.uid);
    }

    const subtotal = products.reduce((accum, currentVal) => {
      return accum += currentVal[4].quantity * currentVal[0].product.price
    }, 0)
    
    setSubtotal(subtotal)

    if (firebase.auth().currentUser.uid) {
      firestore.collection('stripe_customers').doc(firebase.auth().currentUser.uid).get().then((resp) => {
        setCustomerData(resp.data())
      }).catch((err) => {
        console.log(err)
      })
    }

  }, [products])

  const handleAddPaymentMethod = async (ev) => {
    ev.preventDefault();

    const { setupIntent, error } = await stripe.confirmCardSetup(
      customerData.setup_secret,
      {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: cardholderName,
          },
        },
      }
    );

    if (error) {
      console.log(error)
      return;
    }

    firebase
    .firestore()
    .collection('stripe_customers')
    .doc(userUID)
    .collection('payment_methods')
    .add({ id: setupIntent.payment_method })
    .then((resp) => {
        resp.onSnapshot({
          // Listen for document metadata changes
          includeMetadataChanges: true
      }, (doc) => {
        if (doc.data().card) {
          const currentState = paymentMethods
          currentState.push(doc.data());
          setPaymentMethods([...currentState])
        }
      });
    })
  }

  const handleGettingPaymentMethods = () => {
    firestore
      .collection('stripe_customers')
      .doc(firebase.auth().currentUser.uid)
      .collection('payment_methods')
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          return setNoPaymentMethods(true)
        }

        if (paymentMethods.length !== snapshot.size) {
          const currentState = paymentMethods
          snapshot.forEach((doc) => {
            currentState.push(doc.data())
          })

          setPaymentMethods([...currentState])
        }
    })

    const handleUsePaymentClick = (paymentMethod, paymentMethodIdx) => {
      return setPaymentMethod(paymentMethod.id), setActivePaymentMethod(paymentMethodIdx)
    }

    return (
      <div>
        <div>
          <div style={{ paddingBottom: '20px', fontSize: '18px' }}>
            Choose from your payment methods
          </div>
        </div>

        <div>
          {
            paymentMethods.map((paymentMethod, paymentMethodIdx) => {
              return (
                <button 
                  onClick={() => handleUsePaymentClick(paymentMethod, paymentMethodIdx)}
                  style={{ height: "50px", display: "flex", width: "100%", border: "1px solid #1d1d1d", borderRadius: "5px", background: "transparent", padding: "0px", cursor: "pointer" }}
                >
                  <div style={{ height: "100%", width: "10%", display: "flex", alignItems: "center", justifyContent: "center", borderRight: "1px solid #1d1d1d" }}>
                    <div style={{ fontSize: "12px" }}>
                      {
                        paymentMethodIdx === activePaymentMethod ? (
                          <FontAwesomeIcon icon={["fas", "circle"]} />
                        ) : (
                          <FontAwesomeIcon icon={["far", "circle"]} />
                        )
                      }
                    </div>
                  </div>

                  <div style={{ height: "100%", width: "90%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 20px", fontSize: "14px" }}>
                    <div style={{ display: "flex" }}>
                      <div style={{ paddingRight: "10px", textTransform: "capitalize" }}>{paymentMethod.card.brand}</div>
                      <div style={{ paddingRight: "10px" }}>****</div>
                      <div>{paymentMethod.card.last4}</div>
                    </div>

                    <div style={{ display: "flex" }}>
                      <div style={{ paddingRight: "10px" }}>Expires</div>
                      <div style={{ paddingRight: "10px" }} >{paymentMethod.card.exp_month}</div>
                      <div style={{ paddingRight: "10px" }}>/</div>
                      <div>{paymentMethod.card.exp_year}</div>
                    </div>
                  </div>
                </button>
              )
            })
          }
        </div>
      </div>
    )
  }

  const handleGettingBillingAddresses = () => {
    firestore
      .collection('stripe_customers')
      .doc(firebase.auth().currentUser.uid)
      .collection('billing_addresses')
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          return setNoBillingAddresses(true)
        }

        if (billingAddresses.length !== snapshot.size) {
          const currentState = billingAddresses
          snapshot.forEach((doc) => {
            currentState.push(doc.data())
          })

          setBillingAddresses([...currentState])
        }
    }).catch((err) => {
      console.log(err)
    })

    const handleUseAddressClick = (billingAddress, billingAddressIdx) => {
      return setBillingAddress(billingAddress), setActiveBillingAddress(billingAddressIdx)
    }

    return (
      <div>
        <div>
          <div style={{ paddingBottom: '20px', fontSize: '18px' }}>
            Choose from your shipping addresses
          </div>
        </div>

        <div>
          {
            billingAddresses.map((billingAddress, billingAddressIdx) => {
              return (
                <button 
                  onClick={() => handleUseAddressClick(billingAddress, billingAddressIdx)}
                  style={{ height: "50px", display: "flex", width: "100%", border: "1px solid #1d1d1d", borderRadius: "5px", background: "transparent", padding: "0px", cursor: "pointer" }}
                >
                  <div style={{ height: "100%", width: "10%", display: "flex", alignItems: "center", justifyContent: "center", borderRight: "1px solid #1d1d1d" }}>
                    <div style={{ fontSize: "12px" }}>
                      {
                        billingAddressIdx === activeBillingAddress ? (
                          <FontAwesomeIcon icon={["fas", "circle"]} />
                        ) : (
                          <FontAwesomeIcon icon={["far", "circle"]} />
                        )
                      }
                    </div>
                  </div>

                  <div style={{ height: "100%", width: "90%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 20px", fontSize: "14px" }}>
                    <div style={{ display: "flex" }}>
                      <div style={{ paddingRight: "10px" }}>{billingAddress.address.line1}</div>
                    </div>

                    <div style={{ display: "flex" }}>
                      <div style={{ paddingRight: "10px" }}>{billingAddress.address.state}</div>
                      <div style={{ paddingRight: "10px" }} >{billingAddress.address.postal_code}</div>
                    </div>
                  </div>
                </button>
              )
            })
          }
        </div>
      </div>
    )
  }

  // Handle card actions like 3D Secure
  async function handleCardAction(payment, docId) {
    const { error, paymentIntent } = await stripe.handleCardAction(
      payment.client_secret
    );
    if (error) {
      alert(error.message);
      payment = error.payment_intent;
    } else if (paymentIntent) {
      payment = paymentIntent;
    }

    await firebase
      .firestore()
      .collection('stripe_customers')
      .doc(userUID)
      .collection('payments')
      .doc(docId)
      .set(payment, { merge: true });
  }


  const handleCheckoutPurchase = async (ev) => {
    ev.preventDefault();

    const shippingDetails = {
      name: `${firstName} ${lastName}`,
      address: {
        line1: address,
        line2: address2,
        postal_code: zip,
        city,
        state,
        country: region.split(',')[1]
      }
    }
    
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

    const data = {
      payment_method: paymentMethod,
      currency: 'usd',
      status: 'new',
      shipping_details: shippingDetails,
      products: test,
      contact_info: {
        email,
        phone
      },
      user: firebase.auth().currentUser.uid
    }

    firebase
      .firestore()
      .collection('stripe_customers')
      .doc(userUID)
      .collection('payments')
      .add(data).then((docRef) => {
        docRef.onSnapshot((snapshot) => {
          const data = snapshot.data()

          if (data.status === 'succeeded') {
            //IF SUCCESS PUSH TO PURCHASE DASHBOARD
          } else if (data.status === 'requires_action') {
            handleCardAction(data, docRef.id);
          } else if (data.error) {
            alert(data.error)
          }
        })
      }).catch((err) => {
        alert(err)
      })
  }

  const handleAddShippingAddress = () => {
    const errors = []
    if (address.length === 0) {
      errors.push(setNoAddressErr)
    }

    if (city.length === 0) {
      errors.push(setNoCityErr)
    }

    if (region.length === 0) {
      errors.push(setNoRegionErr)
    }

    if (zip.length === 0) {
      errors.push(setNoZipErr)
    }

    if (state.length === 0) {
      errors.push(setNoStateErr)
    }

    if (firstName.length === 0) {
      errors.push(setNoFirstNameErr)
    }

    if (lastName.length === 0) {
      errors.push(setNoLastNameErr)
    }

    if (errors.length > 0) {
      errors.map((err) => {
        return err(true)
      })
    } else {
      firebase
        .firestore()
        .collection('stripe_customers')
        .doc(userUID)
        .collection('billing_addresses')
        .add({
          name: `${firstName} ${lastName}`,
          address: {
            line1: address,
            line2: address2,
            postal_code: zip,
            city,
            state,
            country: region
          }
        }) .then((resp) => {
          resp.onSnapshot({
            // Listen for document metadata changes
            includeMetadataChanges: true
        }, (doc) => {
          const currentState = billingAddresses
          currentState.push(doc.data());
          setBillingAddresses([...currentState])
        });
      }).catch((err) => {
        alert(err)
      })
    }
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
                <span className="checkout-express-checkout-header-border checkout-express-checkout-header-border-left"></span>
                <span className="checkout-express-checkout-header">Express Checkout</span>
                <span className="checkout-express-checkout-header-border checkout-express-checkout-header-border-right"></span>
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
                <div>
                  <input
                    className="checkout-input"
                    placeholder="First name"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  
                  {
                    noFirstNameErr && firstName.length === 0 ? (
                      <div style={{ paddingTop: "10px", color: "#FF0000" }}>
                        * Required
                      </div>
                    ) : null
                  }
                </div>

                <div>
                  <input
                    className="checkout-input"
                    placeholder="Last name"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />

                  {
                    noLastNameErr && lastName.length === 0 ? (
                      <div style={{ paddingTop: "10px", color: "#FF0000" }}>
                        * Required
                      </div>
                    ) : null
                  }
                </div>
              </div>

              <div className="checkout-shipping-info-address-one-wrapper  checkout-input-padding">
                <input
                    className="checkout-input"
                    placeholder="Address"
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />

                  {
                    noAddressErr && address.length === 0 ? (
                      <div style={{ paddingTop: "10px", color: "#FF0000" }}>
                        * Required
                      </div>
                    ) : null
                  }
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

                  {
                    noCityErr && city.length === 0 ? (
                      <div style={{ paddingTop: "10px", color: "#FF0000" }}>
                        * Required
                      </div>
                    ) : null
                  }
              </div>

                <div className="checkout-shipping-info-region-state-city-wrapper checkout-input-padding">
                  <div>
                    <CountryDropdown 
                      setRegion={(country) => setRegion(country)}
                    />

                    {
                      noRegionErr && region.length === 0 ? (
                        <div style={{ paddingTop: "10px", color: "#FF0000" }}>
                          * Required
                        </div>
                      ) : null
                    } 
                  </div>

                  <div>
                    <input
                      className="checkout-input"
                      placeholder="State"
                      type="text"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                    />

                    {
                      noStateErr && state.length === 0 ? (
                        <div style={{ paddingTop: "10px", color: "#FF0000" }}>
                          * Required
                        </div>
                      ) : null
                    }
                  </div>

                  <div>
                    <input
                      className="checkout-input"
                      placeholder="Zip code"
                      type="text"
                      value={zip}
                      onChange={(e) => setZip(e.target.value)}
                    />

                    {
                      noZipErr && zip.length === 0 ? (
                        <div style={{ paddingTop: "10px", color: "#FF0000" }}>
                          * Required
                        </div>
                      ) : null
                    }
                  </div>
                </div>

                <div style={{ marginTop: "20px" }}>
                  <button 
                    onClick={handleAddShippingAddress}
                    style={{ padding: "1rem 2rem", border: "1px solid #1d1d1d", backgroundColor: "#45b3e0", color: "#1d1d1d", borderRadius: "5px", cursor: "pointer" }}
                  >
                    Add this shipping address
                  </button>
                </div>
            </div>

            <div style={{  paddingTop: '80px' }}>
                <div style={{ paddingBottom: '20px', fontSize: '18px' }}>
                  Add a payment method
                </div>

                <div>
                  <input
                    style={{ height: "50px", width: "100%", border: "1px solid #1d1d1d", borderRadius: "5px" }}
                    type="text"
                    className="checkout-input"
                    value={cardholderName}
                    placeholder="Card holder name"
                    onChange={(e) => setCardholderName(e.target.value)}
                  />
                </div>

                <div style={{ marginTop: "20px", height: "50px", width: "100%", border: "1px solid #1d1d1d", borderRadius: "5px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <CardElement
                    options={cardElementOptions} 
                  />
                </div>

                <div style={{ marginTop: "20px" }}>
                  <button 
                    onClick={handleAddPaymentMethod}
                    style={{ padding: "1rem 2rem", border: "1px solid #1d1d1d", backgroundColor: "#45b3e0", color: "#1d1d1d", borderRadius: "5px", cursor: "pointer" }}
                  >
                    Add this card
                  </button>
                </div>
            </div>

            <div style={{ paddingTop: "80px" }}>
              {
                handleGettingPaymentMethods()
              }
            </div>

            <div style={{ paddingTop: "80px" }}>
              {
                handleGettingBillingAddresses()
              }
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
                  to="/checkout/payment"
                  style={{ display: "flex", justifyContent: "space-evenly", padding: "0 3rem", border: "1px solid #1d1d1d", cursor: 'pointer' }}
                  onClick={handleCheckoutPurchase}
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