import React from 'react'

export default (props) => {
  console.log(props.product.image)
  return (
    <div className="product-container">
      <div className="product-image-wrapper">
        <img
          src={props.product.image}
          alt="placeholder"
        />
      </div>
      {props.product.title}
    </div>
  )
}