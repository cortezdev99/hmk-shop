import React, { useContext, useState, useEffect } from 'react'
import firebase from 'firebase/app'
import CartContext from '../../Contexts/CartContext'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default () => {
  const [triggerReRender, setTriggerReRender] = useState(false)

  const {
    isCartOpen,
    setIsCartOpen,
    products
  } = useContext(CartContext)

  const handleCloseModal = () => {
    const htmlElement = document.getElementById('html')
    const cartWrapperElement = document.getElementById('cart-wrapper')
    cartWrapperElement.classList.toggle('cart-slide')

    setTimeout(() => {
      htmlElement.classList.toggle('html-overflow-hidden')
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
      const cartProductWrapper = document.getElementById(`cart-product-wrapper-${id}`)
      const checkoutBtnElm = document.getElementById('cart-product-checkout-wrapper')
      cartProductWrapper.classList.toggle('cart-product-remove-product-anim')
      if (products.length === 1) {
        checkoutBtnElm.classList.toggle('checkout-btn-translate-out')
      }

      setTimeout(() => {
        cartProductWrapper.classList.toggle('cart-product-remove-product-anim')
        products.splice(id, 1)
        setTriggerReRender(!triggerReRender)
      }, 700)
  }

  useEffect(() => {
    const cartWrapperElement = document.getElementById('cart-wrapper')
    if (isCartOpen) {
      cartWrapperElement.classList.toggle('cart-slide')
    }

    const checkoutBtnElm = document.getElementById('cart-product-checkout-wrapper')
    if (products.length === 0 && checkoutBtnElm !== null) {
      checkoutBtnElm.classList.toggle('checkout-btn-no-show')
    }
  })

  if (isCartOpen !== true) {
    return <></>
  }

  return (
    <div className="cart-container">
      <div className="cart-wrapper" id="cart-wrapper">
        <div className="cart-heading-wrapper">
          <div className="cart-heading">
            Cart
          </div>

          <div
            className="cart-heading-close-btn"
            onClick={handleCloseModal}
          >
            <FontAwesomeIcon icon="times" />
          </div>
        </div>

        {
          products.length > 0 ? (
            <div className="cart-products-container">
              {
                products.map((product, productIdx) => {
                  return (
                    <div
                      className={`cart-product-wrapper cart-product-wrapper-${productIdx}`}
                      id={`cart-product-wrapper-${productIdx}`}
                      style={{ position: "relative" }}
                      key={productIdx}
                    >
                      <div className="cart-product-left-column-wrapper">
                        <img
                          alt="cartImage"
                          src={Object.values(product[3])[0]}
                          className="cart-product-img"
                        />
                      </div>

                      <div className="cart-product-right-column-wrapper">
                        <div className="cart-product-title">
                          {product[0].product.title}
                        </div>

                        <div className="cart-product-price">
                          ${product[0].product.price}
                        </div>

                        <div className="cart-product-color-and-size-wrapper">
                          <div className="cart-product-color-and-size">
                            {Object.values(product[2])[0]} / {Object.values(product[1])[0]}
                          </div>
                        </div>

                        <div className="cart-product-quantity-container">
                          <div className="cart-product-quantity-left-column-wrapper">
                            <button
                              type="button"
                              className="cart-product-quantity-toggle"
                              onClick={() => handleQuantityButtonClick('minus', productIdx)}
                            >
                              <FontAwesomeIcon icon="minus" />
                            </button>

                            <div className="cart-product-quantity">
                              {product[4].quantity}
                            </div>

                            <button
                              type="button"
                              className="cart-product-quantity-toggle"
                              onClick={() => handleQuantityButtonClick('plus', productIdx)}
                            >
                              <FontAwesomeIcon icon="plus" />
                            </button>
                          </div>
                            
                          <div className="cart-product-quantity-right-column-wrapper">
                            <button
                              className="cart-product-remove-product-btn"
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
            <div className="cart-product-no-products-wrapper">
              <div className="cart-product-no-products-heading">
                YOUR CART IS EMPTY.
              </div>
            </div>
          )
        }

        <div className="cart-product-checkout-wrapper" id="cart-product-checkout-wrapper">
          {
            firebase.auth().currentUser === null ? (
              <Link
                to={{
                  pathname: '/create-account'
                }}
                onClick={() => {
                  const htmlElement = document.getElementById('html')
                  const cartWrapperElement = document.getElementById('cart-wrapper')
                  cartWrapperElement.classList.toggle('cart-slide')

                  setTimeout(() => {
                    htmlElement.classList.toggle('html-overflow-hidden')
                    setIsCartOpen(false)
                  }, 700)
                }}
              >
                <button className="cart-product-checkout-btn" type="button">
                  Checkout
                </button>
              </Link>
            ) : (
              <Link
                to={{
                  pathname: '/checkout',
                  cartProps: {
                    products: products
                  } 
                }}
                onClick={() => {
                  const htmlElement = document.getElementById('html')
                  const cartWrapperElement = document.getElementById('cart-wrapper')
                  cartWrapperElement.classList.toggle('cart-slide')

                  setTimeout(() => {
                    htmlElement.classList.toggle('html-overflow-hidden')
                    setIsCartOpen(false)
                  }, 700)
                }}
              >
                <button className="cart-product-checkout-btn" type="button">
                  Checkout
                </button>
              </Link>
            )
          }
        </div>
      </div>
    </div>
  )
}