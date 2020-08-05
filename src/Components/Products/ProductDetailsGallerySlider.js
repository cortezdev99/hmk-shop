import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default (props) => {
  const [activeGalloryIdx, setActiveGalloryIdx] = useState(2)
  const [translatePxls, setTranslatePxls] = useState(0)
  
  const {
    images,
    activeImageSet,
    handleGalleryImageClick
  } = props

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
  )
}