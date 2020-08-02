import React from 'react'

export default (props) => {
  console.log(props.product.image)
  return (
    <div style={{ padding: "0 20px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
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