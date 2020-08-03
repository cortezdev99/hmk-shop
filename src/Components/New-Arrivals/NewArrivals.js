import React, { useState } from 'react'
import Products from '../Products/Products'
import FilterProducts from '../Utilities/FilterProducts'

export default () => {
  const data = [
    {
      id: 0,
      title: 'Hoodie',
      image: 'https://via.placeholder.com/250x250',
      categorie: "hoodies",
      colorImages: [
        {
          black: "https://via.placeholder.com/250x250",
        },
        {
          blue: "https://via.placeholder.com/250x250"
        },
        {
          orange: "https://via.placeholder.com/250x250"
        },
        {
          orange: "https://via.placeholder.com/250x250"
        },
        {
          orange: "https://via.placeholder.com/250x250"
        },
        {
          orange: "https://via.placeholder.com/250x250"
        }
      ],
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Turpis tincidunt id aliquet risus feugiat in ante."
    },
    {
      id: 1,
      title: 'Hat',
      image: 'https://via.placeholder.com/250x250',
      categorie: "hats",
      colorImages: [
        {
          black: "https://via.placeholder.com/250x250",
        },
        {
          blue: "https://via.placeholder.com/250x250"
        }
      ],
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Turpis tincidunt id aliquet risus feugiat in ante."
    },
    {
      id: 2,
      title: 'Top Hat',
      image: 'https://via.placeholder.com/250x250',
      categorie: "hats",
      colorImages: [
        {
          black: "https://via.placeholder.com/250x250",
        }
      ],
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Turpis tincidunt id aliquet risus feugiat in ante."
    },
    {
      id: 3,
      title: 'Black Hoodie',
      image: 'https://via.placeholder.com/250x250',
      categorie: "hoodies",
      colorImages: [
        {
          black: "https://via.placeholder.com/250x250",
        },
        {
          blue: "https://via.placeholder.com/250x250"
        },
        {
          orange: "https://via.placeholder.com/250x250"
        }
      ],
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Turpis tincidunt id aliquet risus feugiat in ante."
    },
    {
      id: 4,
      title: 'Gray Sweat Pants',
      image: 'https://via.placeholder.com/250x250',
      categorie: "sweats",
      colorImages: [
        {
          black: "https://via.placeholder.com/250x250",
        },
        {
          blue: "https://via.placeholder.com/250x250"
        },
        {
          orange: "https://via.placeholder.com/250x250"
        }
      ],
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Turpis tincidunt id aliquet risus feugiat in ante."
    },
    {
      id: 5,
      title: 'Sweats',
      image: 'https://via.placeholder.com/250x250',
      categorie: "sweats",
      colorImages: [
        {
          black: "https://via.placeholder.com/250x250",
        },
        {
          blue: "https://via.placeholder.com/250x250"
        },
        {
          orange: "https://via.placeholder.com/250x250"
        }
      ],
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Turpis tincidunt id aliquet risus feugiat in ante."
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