import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default (props) => {
  return (
    <div className="gallery-container">
      {
        props.product.colorImages.length > 3 ? (
          <div
            className="gallery-left-toggle gallery-toggle"
            onClick={() => props.handleTranslatingImages('Left')}
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
                  style={{ transform: `translate3d(${props.translatePxls}px, 0px, 0px)` }}
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
            onClick={() => props.handleTranslatingImages('Right')}
          >
            <FontAwesomeIcon icon="angle-right" />
          </div>
        ) : null
      }
  </div>
  )
}