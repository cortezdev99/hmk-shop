import React from 'react'
import Product from './Product'

export default (props) => {
  return (
    <div style={{ display: "grid", padding: "0 20px", gridTemplateColumns: "1fr 1fr 1fr 1fr" }}>
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