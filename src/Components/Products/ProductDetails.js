import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default (props) => {
  //TODO MAKE CALL TO DATABASE IF PROPS NOT PASSED TO ROUTE
 
  if (props.location.productDetailsProps) {
    const [activeImageSet, setActiveImageSet] = useState(0)
    const [activeImage, setActiveImage] = useState(0)
    const [activeGalloryIdx, setActiveGalloryIdx] = useState(2)
    const [translatePxls, setTranslatePxls] = useState(0)

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

    const handleImageTransition = (direction) => {
      if (direction === 'Left' && activeGalloryIdx !== 2) {
        setActiveGalloryIdx(activeGalloryIdx - 1)
        return setTranslatePxls(translatePxls + 120)
      } else if (direction === 'Right' && activeGalloryIdx < Object.values(images[activeImageSet])[0].length - 1) {
        setActiveGalloryIdx(activeGalloryIdx + 1)
        setTranslatePxls(translatePxls - 120)
      }
    }

    return (
      <div style={{ display: "flex", paddingBottom: "80px" }}>
        <div style={{ width: "50%", paddingTop: "80px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <img
            alt="activeImage"
            src={Object.values(Object.values(images[activeImageSet])[0][activeImage])[0]}
            style={{ width: "500px", height: "500px" }}
          />

          <div style={{ paddingTop: "20px", height: "120px", display: "flex", width: "500px" }}>
            {
              Object.values(images[activeImageSet])[0].length > 3 ? (
                <div
                  style={{ width: "70px", paddingRight: "10px", cursor: "pointer", color: "#7f7f7f", fontSize: "50px", display: "flex", alignItems: "center" }}
                  onClick={() => handleImageTransition('Left')}
                >
                  <FontAwesomeIcon icon="angle-left" />
                </div>
              ) : null
            }

            <div style={{ width: "360px", overflow: "hidden", display: "flex" }}>
              {
                Object.values(images[activeImageSet])[0].map((imageSet, imageSetIdx) => {
                  return (
                    <img
                      onClick={() => handleGalleryImageClick(imageSetIdx)}
                      style={{ width: "100px", height: "100px", margin: "0 10px", cursor: "pointer", position: "relative", transform: `translate3d(${translatePxls}px, 0px, 0px)`, transition: "0.45s ease-in" }}
                      key={imageSetIdx}
                      alt="galloryImage"
                      src={Object.values(imageSet)[0]}
                    />
                  )
                })
              }
            </div>

            {
              Object.values(images[activeImageSet])[0].length > 3 ? (
                <div
                  style={{ width: "70px", paddingLeft: "10px", cursor: "pointer", color: "#7f7f7f", fontSize: "50px", display: "flex", alignItems: "center", justifyContent: "flex-end" }}
                  onClick={() => handleImageTransition('Right')}
                >
                  <FontAwesomeIcon icon="angle-right" />
                </div>
              ) : null
            }
          </div>
        </div>
  
        <div style={{ width: "50%", paddingTop: "80px", paddingRight: "40px", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ textAlign: "center", height: "80px", width: "100%", borderBottom: "1px solid #CCC", display: "flex", alignItems: "center", justifyContent: "center" }}>
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


// {
//   Object.values(images[activeImageSet]).map((imageSet, imgSetIdx) => {
//     return (
//       <div key={imgSetIdx}  style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
//         {
//           imageSet.map((image, imgIdx) => {
//             return (
//               <img
//                 alt="imageSet"
//                 style={{ width: "500px", height: "500px", paddingTop: "40px", paddingBottom: "40px" }}
//                 key={imgIdx}
//                 src={Object.values(image)[0]}
//               />
//             )
//           })
//         }
//       </div>
//     )
//   })
// }