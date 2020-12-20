import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, {useState, useEffect} from 'react'

export default () => {
  const el = window.document.getElementById('more-info-icon-container')
  const [test, setTest] = useState(false)
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


  return (
    <div 
      id="more-info-icon-container"
      style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginTop: "2px"
    }}>
      {
        test ? (
          <div style={{
            position: "absolute",
            top: "-50px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginLeft: "5px"
          }}>
            <div  style={{
              background: "#333333e6",
              // background: "#1c1b1be6",
              color: "#fff",
              borderRadius: "5px",
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
                test
              </div>
            </div>

            <div style={{
              position: "absolute",
              top: "100%",
              width: 0,
              border: "6px solid transparent",
              borderTopColor: "#333333e6"
              // borderTopColor: "#1c1b1be6"
            }}>
              
            </div>
          </div>
        ) : null
      }

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