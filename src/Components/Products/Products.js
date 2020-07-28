import React from 'react'
import Product from './Product'

export default (props) => {
  return (
    <div>
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