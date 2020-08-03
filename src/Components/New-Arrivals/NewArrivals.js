import React, { useState } from 'react'
import Products from '../Products/Products'
import FilterProducts from '../Utilities/FilterProducts'

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

      <FilterProducts handleFilterClick={(product) => handleFilterClick(product)} />

      <div className="new-arrivals-products-container">
        <Products products={products} />
      </div>
    </div>
  )
}