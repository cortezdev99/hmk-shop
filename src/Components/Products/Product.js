import React, {useState} from 'react'

export default (props) => {
  const [image, setImage] = useState(Object.values(props.product.colorImages[0]))
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
    <div className="product-container">
      <div className="product-image-wrapper">
        <img
          src={image}
          alt="placeholder"
        />
      </div>
      
      <div style={{ display: "flex" }}>
        {
          props.product.colorImages.length > 3 ? (
            <div style={{ width: "35px", cursor: "pointer" }} onClick={() => handleTranslatingImages('Left')}>
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
                    style={{ transform: `translate3d(${translatePxls}px, 0px, 0px)` }}
                    className="product-gallary-image"
                    key={idx}
                    src={image}
                    onClick={() => setImage(Object.values(props.product.colorImages[idx]))}
                  />
                )
              })
            })
          }
        </div>

        {
          props.product.colorImages.length > 3 ? (
            <div style={{ width: "35px", cursor: "pointer" }}  onClick={() => handleTranslatingImages('Right')}>
              R
            </div>
          ) : null
        }
      </div>

      <div>
        {props.product.title}
      </div>
    </div>
  )
}