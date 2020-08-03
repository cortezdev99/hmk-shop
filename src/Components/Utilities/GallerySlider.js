import React from 'react'

export default (props) => {
  return (
    <div style={{ display: "flex" }}>
    {
      props.product.colorImages.length > 3 ? (
        <div style={{ width: "35px", cursor: "pointer" }} onClick={() => props.handleTranslatingImages('Left')}>
          L
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
        <div style={{ width: "35px", cursor: "pointer" }}  onClick={() => props.handleTranslatingImages('Right')}>
          R
        </div>
      ) : null
    }
  </div>
  )
}