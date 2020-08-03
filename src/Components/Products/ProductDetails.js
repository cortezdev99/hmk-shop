import React from 'react'

export default (props) => {
  if (props.location.productDetailsProps) {
    const {
      image,
      description
    } = props.location.productDetailsProps.product
    return (
      <div style={{ display: "flex" }}>
        <div style={{ width: "50%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <div>
            <img
              src={image}
              style={{ width: "500px", height: "500px" }}
            />
          </div>
        </div>
  
        <div style={{ width: "50%" }}>
          {description}
        </div>
      </div>
    )
  } else {
    return (
      <div>
        test
      </div>
    )
  }
}