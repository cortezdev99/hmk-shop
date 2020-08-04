import React, { useState } from 'react'

export default (props) => {
  //TODO MAKE CALL TO DATABASE IF PROPS NOT PASSED TO ROUTE
 
  if (props.location.productDetailsProps) {
    const [activeImageSet, setActiveImageSet] = useState(0)
    const {
      title,
      images
    } = props.location.productDetailsProps.product
    
    const handleImageSetChange = (imageSetIdx) => {
      setActiveImageSet(imageSetIdx)
    }

    return (
      <div style={{ display: "flex" }}>
        <div style={{ width: "50%", paddingTop: "40px", paddingBottom: "40px" }}>
          {
            Object.values(images[activeImageSet]).map((imageSet, imgSetIdx) => {
              return (
                <div key={imgSetIdx}  style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                  {
                    imageSet.map((image, imgIdx) => {
                      return (
                        <img
                          alt="imageSet"
                          style={{ width: "500px", height: "500px", paddingTop: "40px", paddingBottom: "40px" }}
                          key={imgIdx}
                          src={Object.values(image)[0]}
                        />
                      )
                    })
                  }
                </div>
              )
            })
          }
        </div>
  
        <div style={{ width: "50%", paddingTop: "80px", paddingRight: "40px", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ textAlign: "center", height: "80px", width: "100%", borderBottom: "1px solid #CCC", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {title}
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", paddingTop: "80px" }}>
            {
              images.map((imageSet, imageSetIdx) => {
                return (
                  <div key={imageSetIdx} style={{ paddingLeft: "20px", width: "120px", paddingBottom: "20px" }}>
                    <img
                      onClick={() => handleImageSetChange(imageSetIdx)}
                      style={{ width: "100px", height: "100px", cursor: "pointer" }}
                      alt="imageSet"
                      src={Object.values(Object.values(imageSet)[0][0])[0]}
                    />

                    <div style={{ paddingTop: "2px", textAlign: "center" }}>
                      {Object.keys(imageSet)[0]}
                    </div>
                  </div>
                )
              })
            }
          </div>
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