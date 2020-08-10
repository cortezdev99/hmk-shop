import React, { useContext, useState, useEffect } from 'react'
import CartContext from '../../Contexts/CartContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default () => {
  const {
    isCartOpen,
    setIsCartOpen,
    products
  } = useContext(CartContext)

  const [triggerReRender, setTriggerReRender] = useState(false)
  
  const handleCloseModal = () => {
    const el = document.getElementById('html')
    const el2 = document.getElementById('cart-wrapper')
    el2.classList.toggle('cart-slide')

    setTimeout(() => {
      el.classList.toggle('overflow-hidden')
      setIsCartOpen(false)
    }, 700)
  }

  const handleQuantityButtonClick = (action, productIdx) => {
    let currentQuantity = products[productIdx][4].quantity
    if (action === 'plus') {
      currentQuantity += 1
    } else if (action === 'minus' && currentQuantity !== 1) {
      currentQuantity -= 1
    }

    products[productIdx].pop()
    products[productIdx].push({ quantity: currentQuantity })
    setTriggerReRender(!triggerReRender)
  }

  const handleRemoveProduct = (id) => {
    if (id < 2) {
      const el = document.getElementById(`cart-product-wrapper-${id}`)
      el.classList.toggle('removed-product-anim')
  
      setTimeout(() => {
        el.classList.toggle('removed-product-anim')
        products.splice(id, 1)
        setTriggerReRender(!triggerReRender)
      }, 700)
    } else {
      products.splice(id, 1)
      setTriggerReRender(!triggerReRender)
    }
  }

  const handleCheckoutClick = () => {
    console.log('Checking out')
  }

  useEffect(() => {
    const el = document.getElementById('cart-wrapper')
    const el2 = document.getElementsByClassName('cart-slide')
    if (isCartOpen && el2.length === 0) {
      el.classList.toggle('cart-slide')
    }
  })

  if (isCartOpen !== true) {
    return <></>
  }

  return (
    <div style={{ position: "fixed", backgroundColor: "rgba(29, 29, 29, 0.7", zIndex: 1000, top: "0", bottom: "0", minHeight: "100vh", height: "100%", width: "100%", display: "flex", justifyContent: "flex-end" }}>
      <div className="cart-wrapper" id="cart-wrapper" style={{ height: "100%", minHeight: "100vh", background: "#fff", width: "80%", maxWidth: "570px", display: "flex", flexDirection: "column", transform: "translateX(570px)", transition: "height 0.5s, transform 0.5s" }}>
        <div style={{ fontSize: "20px", height: "80px", paddingLeft: "40px", paddingRight: "40px", borderBottom: "1px solid #CCC", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            Cart
          </div>

          <div onClick={handleCloseModal} style={{ fontSize: "24px", color: "#1d1d1d", cursor: "pointer" }}>
            <FontAwesomeIcon icon="times" />
          </div>
        </div>

        {
          products.length > 0 ? (
            <div style={{ overflowY: "auto", padding: "40px", display: "flex", flexDirection: "column", gap: "40px", height: "100%", transition: "max-height 0.5s linear" }}>
              {
                products.map((product, productIdx) => {
                  return (
                    <div className={`cart-product-wrapper-${productIdx}`} id={`cart-product-wrapper-${productIdx}`} key={productIdx} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", columnGap: "40px", rowGap: "40px", transition: " max-height 0.5s", maxHeight: "254px" }}>
                      <div style={{ height: "250px", width: "250px" }}>
                        <img
                          alt="cartImage"
                          src={Object.values(product[3])[0]}
                          style={{ width: "100%", height: "100%" }}
                        />
                      </div>

                      <div>
                        <div style={{ height: "calc(100% / 4)" }}>
                          {product[0].product.title}
                        </div>

                        <div style={{ height: "calc(100% / 4)" }}>
                          ${product[0].product.price}
                        </div>

                        <div style={{ display: "flex", height: "calc(100% / 4)" }}>
                          <div style={{ width: "100%" }}>
                            {Object.values(product[2])[0]} / {Object.values(product[1])[0]}
                          </div>
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", height: "calc(100% / 4)"}}>
                          <div style={{ display: "flex", backgroundColor: "#f6f6f6", border: "1px solid #CCC", borderRadius: "5px" }}>
                            <button
                              style={{ width: "calc(100% / 3)", border: "1px solid transparent", backgroundColor: "transparent", cursor: "pointer", color: "#7f7f7f" }}
                              type="button"
                              onClick={() => handleQuantityButtonClick('minus', productIdx)}
                            >
                            <FontAwesomeIcon icon="minus" />
                            </button>

                            <div style={{ width: "calc(100% / 3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                              {product[4].quantity}
                            </div>

                            <button
                              style={{ width: "calc(100% / 3)", border: "1px solid transparent", backgroundColor: "transparent", cursor: "pointer", color: "#7f7f7f" }}
                              type="button"
                              onClick={() => handleQuantityButtonClick('plus', productIdx)}
                            >
                            <FontAwesomeIcon icon="plus" />
                            </button>
                          </div>
                            
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <button
                              style={{ border: "1px solid transparent", backgroundColor: "transparent", cursor: "pointer", textDecorationLine: "underline" }}
                              onClick={() => handleRemoveProduct(productIdx)}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          ) : (
            <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ fontSize: "18px", letterSpacing: "1px" }}>
                YOUR CART IS EMPTY.
              </div>
            </div>
          )
        }

        {
          products.length > 0 ? (
            <div style={{ position: "relative", padding: "0 40px", paddingBottom: "40px" }}>
              <button
                onClick={handleCheckoutClick}
                style={{ padding: "1rem", width: "100%", cursor: "pointer", borderRadius: "5px", background: "#45b3e0",  border: "1px solid transparent" }}
              >
                Checkout
              </button>
            </div>
          ) : (
            <></>
          )
        }
      </div>
    </div>
  )
}