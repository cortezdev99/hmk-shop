import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import GallerySlider from '../Utilities/GallerySlider'

export default (props) => {
  const [image, setImage] = useState(Object.values(Object.values(props.product.images[0])[0][0])[0])
  // let xmlhttp
  // if (window.XMLHttpRequest) {
    // code for modern browsers
    // xmlhttp = new XMLHttpRequest();
    // console.log()
    // xmlhttp.open('GET', `${Object.values(Object.values(props.product.images[0])[0][0])[0]}`, true);
    // xmlhttp.overrideMimeType('text/plain; charset=x-user-defined');
    // xmlhttp.send(null);
//   } else {
//     // code for old IE browsers
//     xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
//  }
//  console.log(xmlhttp)
    // xmlhttp.onprogress = (event) => console.log(event)
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