import React from 'react'

export default (props) => {
  console.log(props.product.image)
  return (
    <div>
      <div>
        <img
          src={props.product.image}
          alt="placeholder"
        />
      </div>
      {props.product.title}
    </div>
  )
}