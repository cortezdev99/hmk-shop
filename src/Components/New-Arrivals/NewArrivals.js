import React from 'react'
import Products from '../Products/Products'

export default () => {
  const data = [
    {
      title: 'Hoodie',
      image: 'https://via.placeholder.com/250x250'
    },
    {
      title: 'Hat',
      image: 'https://via.placeholder.com/250x250'
    },
    {
      title: 'Sweats',
      image: 'https://via.placeholder.com/250x250'
    }
  ]
  
  return (
    <div style={{ height: "calc(100% - 120px)", width: "100%", position: "absolute" }}>
      <div style={{ width: "100%", height: "40%", position: "relative" }}>
        <img
          src="https://via.placeholder.com/250x250"
          alt="placeholder"
          style={{ position: "absolute", width: "100%", height: "100%" }}
        />
      </div>

      <div style={{ height: "80px", display: "flex", alignItems: "center", justifyContent: "space-evenly" }}>
        <div>
          Placeholder
        </div>

        <div>
          Placeholder
        </div>
        
        <div>
          Placeholder
        </div>
      </div>

      <div>
        <Products products={data} />
      </div>
    </div>
  )
}