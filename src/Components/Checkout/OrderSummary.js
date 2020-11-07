import React from 'react'
import Shipping from '../Utilities/Shipping';

export default (props) => {
  return (
    <div className="checkout-right-column-wrapper">
      <div className="checkout-products-wrapper">
        {props.products.map((product, productIdx) => {
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
          );
        })}
      </div>

      <div className="checkout-discount-code-wrapper">
        <div className="checkout-discount-input-wrapper">
          <input
            className="checkout-input"
            placeholder="Discount or promo code"
            type="text"
            onChange={e => props.setDiscount(e.target.value)}
          />
        </div>

        <div className="checkout-discount-btn-wrapper">
          <button
            className="checkout-discount-btn"
            onClick={props.handleAddDiscountClick}
          >
            Apply
          </button>
        </div>
      </div>

      <div className="checkout-total-calculations-wrapper">
        <div className="checkout-subtotal-wrapper">
          <div className="checkout-subtotal-header">Subtotal</div>

          <div className="checkout-subtotal-price">${props.subtotal}</div>
        </div>

        <div className="checkout-shipping-wrapper">
          <div className="checkout-shipping-header">Shipping</div>

          <div className="checkout-shipping-price">
            {props.subtotal <= 100 ? "$6" : "FREE"}
          </div>
        </div>

        {props.activeDiscount ? (
          <div
            className="checkout-shipping-wrapper"
            style={{ paddingTop: "20px" }}
          >
            <div className="checkout-shipping-header">Discount</div>

            <div className="checkout-shipping-price">
              {props.activeDiscount.displayable_discount}
            </div>
          </div>
        ) : null}
      </div>

      <div className="checkout-total-wrapper">
        <div className="checkout-total-header">Total</div>

        <div className="checkout-total-price">
          {props.subtotal < 100 && !props.activeDiscount
            ? `$${props.subtotal + 6}`
            : props.subtotal < 100 && props.activeDiscount
            ? `$${props.subtotal + 6 - props.activeDiscount.discount_amount}`
            : props.subtotal >= 100 && props.activeDiscount
            ? "$" + (props.subtotal - props.activeDiscount.discount_amount)
            : "$" + props.subtotal}
        </div>
      </div>

      {
        props.includeShipping ? (
          <div>
            <Shipping paddingReAlign={true} />
          </div>
        ) : null
      }
    </div>
  )
}