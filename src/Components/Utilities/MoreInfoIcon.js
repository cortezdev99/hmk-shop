import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, {useState, useEffect} from 'react'

export default (props) => {
  const iconContainerElem = window.document.getElementById('more-info-icon-container')
  const popupContentWrapperElem = window.document.getElementById('more-info-popup-content')
  const [isPopupContentShowing, setIsPopupContentShowing] = useState(false)
  const [popupContentOffset, setPopupContentOffset] = useState(50)

  const handleShowingPopup = (e) => {
    e.stopPropagation()

    setIsPopupContentShowing(true)
    setTimeout(() => {
      setIsPopupContentShowing(false)
    }, 2000)
  }

  useEffect(() => {
    if (iconContainerElem !== null) {
      iconContainerElem.addEventListener("mouseenter", () => {
        setIsPopupContentShowing(true)
      })
    
      iconContainerElem.addEventListener("mouseleave", () => {
        setIsPopupContentShowing(false)
      })
    }
  })

  useEffect(() => {
    if (popupContentWrapperElem) {
      if (popupContentWrapperElem.clientHeight !== popupContentOffset) {
        setPopupContentOffset(popupContentWrapperElem.clientHeight);
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
          top: `-${popupContentOffset}px`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginLeft: "5px",
          visibility: `${isPopupContentShowing ? "visible" : "hidden"}`
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
      onClick={handleShowingPopup}
      >
        <FontAwesomeIcon 
          icon={['fas', 'info-circle']}
        />
      </div>
    </div>
  )
}