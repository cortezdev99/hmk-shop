import React from 'react'
import Products from '../Products/Products'

export default () => {
  const data = [
    {
      title: 'Hoodie'
    },
    {
      title: 'Hat'
    },
    {
      title: 'Sweats'
    }
  ]
  
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <div style={{ width: "100%", height: "40%", position: "relative" }}>
        <img
          src="https://via.placeholder.com/250x250"
          alt="placeholder"
          style={{ position: "absolute", width: "100%", height: "100%" }}
        />
      </div>

      <div>
        <Products products={data} />
      </div>
    </div>
  )
}