import React, {useState} from 'react'
import GallerySlider from '../Utilities/GallerySlider'

export default (props) => {
  const [image, setImage] = useState(Object.values(props.product.colorImages[0]))

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
        setImage={(image) => setImage(image)}
      />

      <div>
        {props.product.title}
      </div>
    </div>
  )
}