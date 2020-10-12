import React, { useState, useEffect, useReducer } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default (props) => {
  const [translatePxls, setTranslatePxls] = useState(0)
  const [activeGalloryIdx, setActiveGalloryIdx] = useState(2)
  const [prevWindowWidth, setPrevWindowWidth] = useState(window.document.body.clientWidth)
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

  const handleTranslatingImages = (direction) => {
    if (direction === 'Left' && activeGalloryIdx !== 2 && window.document.body.clientWidth > 640) {
      setActiveGalloryIdx(activeGalloryIdx - 1)
      return setTranslatePxls(translatePxls + 60)
    } else if (direction === 'Right' && activeGalloryIdx < props.product.images.length - 1 && window.document.body.clientWidth > 640) {
      setActiveGalloryIdx(activeGalloryIdx + 1)
      setTranslatePxls(translatePxls - 60)
    } else if (direction === 'Left' && activeGalloryIdx !== 2 && window.document.body.clientWidth <= 640 && window.document.body.clientWidth > 375) {
      setActiveGalloryIdx(activeGalloryIdx - 1)
      return setTranslatePxls(translatePxls + 55)
    } else if (direction === 'Right' && activeGalloryIdx < props.product.images.length && window.document.body.clientWidth <= 640 && window.document.body.clientWidth > 375) {
      setActiveGalloryIdx(activeGalloryIdx + 1)
      setTranslatePxls(translatePxls - 55)
    } else if (direction === 'Left' && activeGalloryIdx !== 2 && window.document.body.clientWidth <= 375) {
      setActiveGalloryIdx(activeGalloryIdx - 1)
      return setTranslatePxls(translatePxls + 46.5)
    } else if (direction === 'Right' && activeGalloryIdx < props.product.images.length && window.document.body.clientWidth <= 375) {
      setActiveGalloryIdx(activeGalloryIdx + 1)
      setTranslatePxls(translatePxls - 46.5)
    }
  }

    useEffect(() => {
      window.addEventListener('resize', (event) => {
        if (window.document.body.clientWidth > 640 && prevWindowWidth < 640) {
          setPrevWindowWidth(window.document.body.clientWidth)
          setActiveGalloryIdx(2)
          setTranslatePxls(0)
          forceUpdate()
        } else if (window.document.body.clientWidth < 640 && prevWindowWidth > 640) {
          setPrevWindowWidth(window.document.body.clientWidth)
          setActiveGalloryIdx(2)
          setTranslatePxls(0)
          forceUpdate()
        }
      })
    })

  return (
    <div className="gallery-container">
      {
        window.document.body.clientWidth > 640 && props.product.images.length > 3 ? (
          <div
            className="gallery-left-toggle gallery-toggle"
            onClick={() => handleTranslatingImages('Left')}
          >
            <FontAwesomeIcon icon="angle-left" />
          </div>
        ) : window.document.body.clientWidth < 640 && props.product.images.length > 2 ? (
          <div
          className="gallery-left-toggle gallery-toggle"
          onClick={() => handleTranslatingImages('Left')}
          >
            <FontAwesomeIcon icon="angle-left" />
          </div>
        ) : null
      }

      <div className="gallery-images-container">
        {
          props.product.images.map((color, idx) => {
            const images = Object.values(color)
            return images.map((image) => {
              return (
                <img
                  style={{ transform: `translate3d(${translatePxls}px, 0px, 0px)` }}
                  className="gallary-images-image"
                  key={idx}
                  alt="gallory"
                  src={Object.values(image[0])[0]}
                  onClick={() => props.setImage(Object.values(Object.values(props.product.images[idx])[0][0])[0])}
                />
              )
            })
          })
        }
      </div>

      {
         window.document.body.clientWidth > 640 && props.product.images.length > 3 ? (
          <div
            className="gallery-right-toggle gallery-toggle"
            onClick={() => handleTranslatingImages('Right')}
          >
            <FontAwesomeIcon icon="angle-right" />
          </div>
        ) : window.document.body.clientWidth < 640 && props.product.images.length > 2 ? (
          <div
            className="gallery-right-toggle gallery-toggle"
            onClick={() => handleTranslatingImages('Right')}
          >
            <FontAwesomeIcon icon="angle-right" />
          </div>
        ) : null
      }
  </div>
  )
}