import React, { useState } from 'react'
import ProductDetailsGallerySlider from './ProductDetailsGallerySlider'
import Shipping from '../Utilities/Shipping'

export default (props) => {
  //TODO MAKE CALL TO DATABASE IF PROPS NOT PASSED TO ROUTE
 
  if (props.location.productDetailsProps) {
    const [activeImageSet, setActiveImageSet] = useState(0)
    const [activeImage, setActiveImage] = useState(0)

    const {
      title,
      images,
      sizes,
      details
    } = props.location.productDetailsProps.product
    
    const handleImageSetChange = (imageSetIdx) => {
      setActiveImage(0)
      setActiveImageSet(imageSetIdx)
    }

    const handleGalleryImageClick = (imageIdx) => {
      setActiveImage(imageIdx)
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
                  return (
                    <div className="product-details-product-size-wrapper" key={sizeIdx}>
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
            <button className="product-details-product-cart-btn">
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