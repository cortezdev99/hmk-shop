import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default (props) => {
  const [translatePxls, setTranslatePxls] = useState(0)
  const [activeGalloryIdx, setActiveGalloryIdx] = useState(2)

  const handleTranslatingImages = (direction) => {
    if (direction === 'Left' && activeGalloryIdx !== 2) {
      setActiveGalloryIdx(activeGalloryIdx - 1)
      return setTranslatePxls(translatePxls + 60)
    } else if (direction === 'Right' && activeGalloryIdx < props.product.colorImages.length - 1) {
      setActiveGalloryIdx(activeGalloryIdx + 1)
      setTranslatePxls(translatePxls - 60)
    }
  }

  return (
    <div className="gallery-container">
      {
        props.product.colorImages.length > 3 ? (
          <div
            className="gallery-left-toggle gallery-toggle"
            onClick={() => handleTranslatingImages('Left')}
          >
            <FontAwesomeIcon icon="angle-left" />
          </div>
        ) : null
      }

      <div className="gallery-images-container">
        {
          props.product.colorImages.map((color, idx) => {
            const images = Object.values(color)
            return images.map((image) => {
              return (
                <img
                  style={{ transform: `translate3d(${translatePxls}px, 0px, 0px)` }}
                  className="gallary-images-image"
                  key={idx}
                  alt="gallory"
                  src={image}
                  onClick={() => props.setImage(Object.values(props.product.colorImages[idx]))}
                />
              )
            })
          })
        }
      </div>

      {
        props.product.colorImages.length > 3 ? (
          <div
            className="gallery-right-toggle gallery-toggle"
            onClick={() => handleTranslatingImages('Right')}
          >
            <FontAwesomeIcon icon="angle-right" />
          </div>
        ) : null
      }
  </div>
  )
}