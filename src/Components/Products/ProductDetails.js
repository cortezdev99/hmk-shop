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
      <div style={{ display: "flex", paddingBottom: "80px" }}>
        <div style={{ width: "50%", paddingTop: "80px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start" }}>
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

          <div style={{ paddingTop: "80px" }}>
            <div style={{ marginBottom: "20px" }}>
              Colors
            </div>

            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {
                images.map((imageSet, imageSetIdx) => {
                  return (
                    <div key={imageSetIdx} style={{ paddingRight: "20px", width: "120px", paddingBottom: "20px" }}>
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

          <div style={{ paddingTop: "60px" }}>
            <div style={{ marginBottom: "20px" }}>
              Sizes
            </div>

            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {
                sizes.map((size, sizeIdx) => {
                  return (
                    <div key={sizeIdx} style={{ marginRight: "20px", marginBottom: "20px", width: "100px", height: "100px", display: "flex", alignItems: "center", justifyContent: "center", background: "#c2c2c2" }}>
                      {size}
                    </div>
                  )
                })
              }
            </div>
          </div>

          <div style={{ paddingTop: "60px", width: "100%" }}>
            <button style={{ width: "100%", padding: "1rem", borderRadius: "5px", border: "1px solid transparent", background: "#45b3e0" }}>
              Add to Cart
            </button>
          </div>

          <div style={{ paddingTop: "80px", width: "100%" }}>
            <div style={{ marginBottom: "20px" }}>
              Details
            </div>

            <div>
              {
                details.map((detail, detailIdx) => {
                  return (
                    <li key={detailIdx}>
                      {detail}
                    </li>
                  )
                })
              }
            </div>
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

// <div className="accordion">
//               <button type="button" className="accordion__button">
//                 Expand Content
//               </button>

//               <div className="accordion__content">
//                 <p>
//                   Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit ex nemo provident, debitis excepturi doloribus qui nulla odit dolorem neque recusandae amet praesentium iusto explicabo repellendus, ducimus molestiae saepe. Deleniti!Consectetur nesciunt magnam ab voluptatem dolore nobis, ratione, explicabo labore enim deserunt similique illo, doloremque sapiente alias fugit velit ipsum dolorem ea! Aperiam similique delectus nihil nulla aut, nisi quaerat.
//                 </p>
//               </div>
//           </div>

