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
      title: 'Top Hat',
      image: 'https://via.placeholder.com/250x250',
      categorie: "hats"
    },
    {
      title: 'Black Hoodie',
      image: 'https://via.placeholder.com/250x250',
      categorie: "hoodies"
    },
    {
      title: 'Gray Sweat Pants',
      image: 'https://via.placeholder.com/250x250',
      categorie: "sweats"
    },
    {
      title: 'Sweats',
      image: 'https://via.placeholder.com/250x250',
      categorie: "sweats"
    }
  ]

  const [products, setProducts] = useState(data)

  const handleFilterClick = (categorie) => {
    if (categorie === 'all') {
      return setProducts(data)
    }

    const filteredProducts = data.filter(
      (product) => product.categorie === categorie
    )

    setProducts(filteredProducts)
  }
  
  return (
    <div className="new-arrivals-container">
      <div className="new-arrivals-image-wrapper">
        <img
          className="new-arrivals-image"
          src="https://via.placeholder.com/250x250"
          alt="placeholder"
        />
      </div>

      <div style={{ height: "80px", display: "flex", alignItems: "center", justifyContent: "space-evenly" }}>
        <div style={{ width: "60px" }} onClick={() => handleFilterClick('all')}>
          All
        </div>

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