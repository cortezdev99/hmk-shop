import React, {useState} from 'react'
import GallerySlider from '../Utilities/GallerySlider'

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

      <GallerySlider
        product={props.product}
        handleTranslatingImages={(direction) => handleTranslatingImages(direction)}
        translatePxls={translatePxls}
        setImage={(image) => setImage(image)}
      />

      <div>
        {props.product.title}
      </div>
    </div>
  )
}