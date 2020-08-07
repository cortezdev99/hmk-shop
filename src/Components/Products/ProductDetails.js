import React, { useState, useContext } from 'react'
import ProductDetailsGallerySlider from './ProductDetailsGallerySlider'
import Shipping from '../Utilities/Shipping'
import CartContext from '../../Contexts/CartContext'

export default (props) => {
  const {
    isCartOpen,
    setCartIsOpen
  } = useContext(CartContext)

  //TODO MAKE CALL TO DATABASE IF PROPS NOT PASSED TO ROUTE
 
  if (props.location.productDetailsProps) {
    const {
      title,
      images,
      sizes,
      details
    } = props.location.productDetailsProps.product

    const [activeImageSet, setActiveImageSet] = useState(0)
    const [activeImage, setActiveImage] = useState(0)
    const [activeSize, setActiveSize] = useState(0)
    const [size, setSize] = useState(Object.values(sizes[0])[0])

    
    const handleImageSetChange = (imageSetIdx) => {
      setActiveImage(0)
      return setActiveImageSet(imageSetIdx)
    }

    const handleGalleryImageClick = (imageIdx) => {
      return setActiveImage(imageIdx)
    }

    const handleSizeClick = (size) => {
      setActiveSize(size)
      return setSize(Object.values(sizes[size])[0])
    }

    const handleAddToCart = () => {
      console.log(isCartOpen)
    }

    return (
      <div className="product-details-container">
        <div className="product-details-left-column-wrapper">
          <img
            alt="activeImage"
            src={Object.values(Object.values(images[activeImageSet])[0][activeImage])[0]}
            className="product-details-left-column-image"
          />

          <ProductDetailsGallerySlider
            images={images}
            handleGalleryImageClick={(imageSetIdx) => handleGalleryImageClick(imageSetIdx)}
            activeImageSet={activeImageSet}
          />
        </div>
  
        <div className="product-details-right-column-wrapper">
          <div className="product-details-product-title-wrapper">
            {title}
          </div>

          <div className="product-details-product-colors-container">
            <div className="product-details-product-header">
              Colors
            </div>

            <div className="product-details-product-colors-wrapper">
              {
                images.map((imageSet, imageSetIdx) => {
                  return (
                    <div className="product-details-product-color-wrapper" key={imageSetIdx}>
                      <img
                        onClick={() => handleImageSetChange(imageSetIdx)}
                        alt="imageSet"
                        className="product-details-product-color-image"
                        src={Object.values(Object.values(imageSet)[0][0])[0]}
                      />

                      <div className="product-details-product-color-title">
                        {Object.keys(imageSet)[0]}
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>

          <div className="product-details-product-sizes-container">
            <div className="product-details-product-header">
              Sizes
            </div>

            <div className="product-details-product-sizes-wrapper">
              {
                sizes.map((size, sizeIdx) => {
                  const styles = sizeIdx === activeSize ? { border: "1px solid #1d1d1d" } : {}
                  return (
                    <div
                      style={styles}
                      onClick={() => handleSizeClick(sizeIdx)}
                      className="product-details-product-size-wrapper"
                      key={sizeIdx}
                    >
                      {size}
                    </div>
                  )
                })
              }
            </div>
          </div>         

          <div className="product-details-product-details-container">
            <div className="product-details-product-header">
              Details
            </div>

            <div className="product-details-product-details-wrapper">
              {
                details.map((detail, detailIdx) => {
                  return (
                    <li className="product-details-product-detail-wrapper" key={detailIdx}>
                      {detail}
                    </li>
                  )
                })
              }
            </div>
          </div>

          <div className="product-details-product-cart-btn-container">
            <button type="button" onClick={handleAddToCart} className="product-details-product-cart-btn">
              Add to Cart
            </button>
          </div>

          <Shipping />
        </div>
      </div>
    )
  } else {
    return (
      <div>
        test
      </div>
    )
  }
}