import React, { useState } from 'react'
import ProductDetailsGallerySlider from './ProductDetailsGallerySlider'

export default (props) => {
  //TODO MAKE CALL TO DATABASE IF PROPS NOT PASSED TO ROUTE
 
  if (props.location.productDetailsProps) {
    const [activeImageSet, setActiveImageSet] = useState(0)
    const [activeImage, setActiveImage] = useState(0)

    const {
      title,
      images
    } = props.location.productDetailsProps.product
    
    const handleImageSetChange = (imageSetIdx) => {
      setActiveImage(0)
      setActiveImageSet(imageSetIdx)
    }

    const handleGalleryImageClick = (imageIdx) => {
      setActiveImage(imageIdx)
    }

    return (
      <div style={{ display: "flex", paddingBottom: "80px" }}>
        <div style={{ width: "50%", paddingTop: "80px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <img
            alt="activeImage"
            src={Object.values(Object.values(images[activeImageSet])[0][activeImage])[0]}
            style={{ width: "500px", height: "500px" }}
          />

          <ProductDetailsGallerySlider
            images={images}
            handleGalleryImageClick={(imageSetIdx) => handleGalleryImageClick(imageSetIdx)}
            activeImageSet={activeImageSet}

          />
        </div>
  
        <div style={{ width: "50%", paddingTop: "80px", paddingRight: "40px", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ textAlign: "center", paddingBottom: "40px", width: "100%", borderBottom: "1px solid #CCC", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {title}
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", paddingTop: "80px" }}>
            {
              images.map((imageSet, imageSetIdx) => {
                return (
                  <div key={imageSetIdx} style={{ paddingLeft: "20px", width: "120px", paddingBottom: "20px" }}>
                    <img
                      onClick={() => handleImageSetChange(imageSetIdx)}
                      style={{ width: "100px", height: "100px", cursor: "pointer" }}
                      alt="imageSet"
                      src={Object.values(Object.values(imageSet)[0][0])[0]}
                    />

                    <div style={{ paddingTop: "2px", textAlign: "center" }}>
                      {Object.keys(imageSet)[0]}
                    </div>
                  </div>
                )
              })
            }
          </div>
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