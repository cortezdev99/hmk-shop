import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, {useState, useEffect} from 'react'

export default (props) => {
  const el = window.document.getElementById('more-info-icon-container')
  const el2 = window.document.getElementById('more-info-popup-content')
  const [test, setTest] = useState(false)
  const [offset, setOffset] = useState(50)
  const handleTest = (e) => {
    e.stopPropagation()

    setTest(true)

    setTimeout(() => {
      setTest(false)
    }, 2000)
  }

  useEffect(() => {
    if (el !== null) {
      el.addEventListener("mouseenter", () => {
        setTest(true)
      })
    
      el.addEventListener("mouseleave", () => {
        setTest(false)
      })
    }
  })

  useEffect(() => {
    if (el2) {
      if (el2.clientHeight !== offset) {
        setOffset(el2.clientHeight);
      }
    }
  })


  return (
    <div 
      id="more-info-icon-container"
      style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginTop: "2px"
    }}>
        <div 
          id="more-info-popup-content"
          style={{
          position: "absolute",
          top: `-${offset}px`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginLeft: "5px",
          visibility: `${test ? "visible" : "hidden"}`
        }}>
          <div  style={{
            background: "#333333e6",
            color: "#fff",
            borderRadius: "5px",
            fontWeight: "600",
            padding: "5px",
            minWidth: "100px",
            maxWidth: "175px",
            minHeight: "50px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <div style={{
              marginBottom: "2px",
              textAlign: "center"
            }}>
              {props.info}
            </div>
          </div>

          <div style={{
            position: "absolute",
            top: "100%",
            width: 0,
            border: "6px solid transparent",
            borderTopColor: "#333333e6"
          }}>
            
          </div>
        </div>

      <div style={{
        paddingLeft: "5px",
        color: "rgba(114, 114, 114, 1)"
      }}
      onClick={handleTest}
      >
        <FontAwesomeIcon 
          icon={['fas', 'info-circle']}
        />
      </div>
    </div>
  )
}