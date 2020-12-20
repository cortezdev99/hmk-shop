import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, {useState} from 'react'

export default () => {
  const [test, setTest] = useState(false)
  const handleTest = () => {
    setTest(!test)
  }

  return (
    <div>
      {
        test ? (
          <div style={{
            position: "absolute",
            top: "-40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <div  style={{
              background: "#333333e6",
              color: "#fff"
            }}>
              test
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