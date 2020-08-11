import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import GallerySlider from '../Utilities/GallerySlider'

export default (props) => {
  console.log()
  const [image, setImage] = useState(Object.values(Object.values(props.product.images[0])[0][0])[0])

  return (
    <div className="product-container">
      <Link
        className="product-image-wrapper"
        to={{
          pathname: `/products/${props.product.id}`,
          productDetailsProps: {
            product: props.product
          } 
        }}
      >
        <img
          src={image}
          alt="placeholder"
        />
      </Link>

      <GallerySlider
        product={props.product}
        setImage={(image) => setImage(image)}
      />

      <Link
        to={{
          pathname: `/products/${props.product.id}`,
          productDetailsProps: {
            product: props.product
          } 
        }}
        className="product-title-wrapper"
        style={{ paddingTop: "5px", paddingBottom: "5px", textAlign:  "center" }}
      >
        {props.product.title}
      </Link>

      <div style={{ paddingTop: "5px", paddingBottom: "5pxs" }}>
        ${props.product.price}
      </div>
    </div>
  )
}