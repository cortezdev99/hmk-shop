import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default (props) => {
  return (
    <div style={{ display: "flex", paddingTop: "5px" }}>
    {
      props.product.colorImages.length > 3 ? (
        <div style={{ width: "35px", cursor: "pointer", paddingRight: "5px", fontSize: "35px", display: "flex", alignItems: "center", color: "#7f7f7f" }} onClick={() => props.handleTranslatingImages('Left')}>
          <FontAwesomeIcon icon="angle-left" />
        </div>
      ) : null
    }

    <div style={{ display: "flex", maxWidth: "180px", overflow: "hidden" }}>
      {
        props.product.colorImages.map((color, idx) => {
          const images = Object.values(color)
          return images.map((image) => {
            return (
              <img
                style={{ transform: `translate3d(${props.translatePxls}px, 0px, 0px)` }}
                className="product-gallary-image"
                key={idx}
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
        <div style={{ width: "35px", cursor: "pointer", paddingLeft: "5px", fontSize: "35px", display: "flex", alignItems: "center", justifyContent: "flex-end", color: "#7f7f7f" }}  onClick={() => props.handleTranslatingImages('Right')}>
          <FontAwesomeIcon icon="angle-right" />
        </div>
      ) : null
    }
  </div>
  )
}