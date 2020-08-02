import React from 'react'
import Product from './Product'

export default (props) => {
  return (
    <div className="products-container">
      {
        props.products.map((product, idx) => {
          return (
            <Product key={idx} product={product} />
          )
        })
      }
    </div>
  )
}