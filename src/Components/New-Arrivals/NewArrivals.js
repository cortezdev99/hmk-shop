import React, { useState } from 'react'
import Products from '../Products/Products'

export default () => {
  const data = [
    {
      title: 'Hoodie',
      image: 'https://via.placeholder.com/250x250',
      categorie: "hoodies"
    },
    {
      title: 'Hat',
      image: 'https://via.placeholder.com/250x250',
      categorie: "hats"
    },
    {
      title: 'Sweats',
      image: 'https://via.placeholder.com/250x250',
      categorie: "sweats"
    }
  ]

  const [products, setProducts] = useState(data)

  const handleFilterClick = (categorie) => {
    const filteredProducts = data.filter(
      (product) => product.categorie === categorie
    )
    
    setProducts(filteredProducts)
  }
  
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
        <div style={{ width: "60px" }} onClick={() => handleFilterClick('hoodies')}>
          Hoodies
        </div>

        <div style={{ width: "60px" }} onClick={() => handleFilterClick('sweats')}>
          Sweats
        </div>

        <div style={{ width: "60px" }} onClick={() => handleFilterClick('hats')}>
          Hats
        </div>
      </div>

      <div>
        <Products products={products} />
      </div>
    </div>
  )
}