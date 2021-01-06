import React from 'react'

export default (props) => {
  const containerStyle = {
    position: "relative",
    width: "0px",
    height: "0px",
    alignSelf: "flex-start",
    ...props.containerStyle
  }
  
  const labelStyle = {
    zIndex: 2,
    float: "left",
    padding: "0px 5px 0px 5px",
    position: "absolute",
    left: "20px",
    fontSize: "12px",
    textTransform: "uppercase",
    whiteSpace: "nowrap",
    top: "-7px",
    color: "#7c7979",
    background: "linear-gradient(0deg, #fbfbfb, #fbfbfb, #fff, #fff)",
    "-webkit-font-smoothing": "subpixel-antialiased",
    ...props.labelStyle
  }

  return (
    <div style={containerStyle}>
      <label style={labelStyle}>
        {props.labelText}
      </label>
    </div>
  )
}