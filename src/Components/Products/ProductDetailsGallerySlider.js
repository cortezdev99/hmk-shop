import React, { useState, useEffect, useReducer } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default props => {
  const [activeGalloryIdx, setActiveGalloryIdx] = useState(2);
  const [translatePxls, setTranslatePxls] = useState(0);
  const [prevWindowWidth, setPrevWindowWidth] = useState(
    window.document.body.clientWidth
  );
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

  const { images, activeImageSet, handleGalleryImageClick } = props;
  let timeout = false;

  useEffect(() => {
    window.addEventListener("resize", event => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        if (activeGalloryIdx === 2 || translatePxls === 0) {
          return
        }
  
        if (window.document.body.clientWidth > 579 && prevWindowWidth < 579) {
          setPrevWindowWidth(window.document.body.clientWidth);
          setActiveGalloryIdx(2);
          setTranslatePxls(0);
          forceUpdate();
        } else if (
          prevWindowWidth > 579 &&
          window.document.body.clientWidth < 579
        ) {
          setPrevWindowWidth(window.document.body.clientWidth);
          setActiveGalloryIdx(2);
          setTranslatePxls(0);
          forceUpdate();
        } else if (
          window.document.body.clientWidth > 479 &&
          prevWindowWidth < 479
        ) {
          setPrevWindowWidth(window.document.body.clientWidth);
          setActiveGalloryIdx(2);
          setTranslatePxls(0);
          forceUpdate();
        } else if (
          prevWindowWidth > 479 &&
          window.document.body.clientWidth < 479
        ) {
          setPrevWindowWidth(window.document.body.clientWidth);
          setActiveGalloryIdx(2);
          setTranslatePxls(0);
          forceUpdate();
        } else if (
          window.document.body.clientWidth > 339 &&
          prevWindowWidth < 339
        ) {
          setPrevWindowWidth(window.document.body.clientWidth);
          setActiveGalloryIdx(2);
          setTranslatePxls(0);
          forceUpdate();
        } else if (
          prevWindowWidth > 339 &&
          window.document.body.clientWidth < 339
        ) {
          setPrevWindowWidth(window.document.body.clientWidth);
          setActiveGalloryIdx(2);
          setTranslatePxls(0);
          forceUpdate();
        }
      }, 500)    
    });
  });

  const handleImageTransition = direction => {
    if (
      direction === "Left" &&
      activeGalloryIdx !== 2 &&
      window.document.body.clientWidth > 579
    ) {
      setActiveGalloryIdx(activeGalloryIdx - 1);
      return setTranslatePxls(translatePxls + 120);
    } else if (
      direction === "Right" &&
      activeGalloryIdx < Object.values(images[activeImageSet])[0].length - 1 &&
      window.document.body.clientWidth > 579
    ) {
      setActiveGalloryIdx(activeGalloryIdx + 1);
      setTranslatePxls(translatePxls - 120);
    } else if (
      direction === "Left" &&
      activeGalloryIdx !== 2 &&
      window.document.body.clientWidth < 579 &&
      window.document.body.clientWidth > 479
    ) {
      setActiveGalloryIdx(activeGalloryIdx - 1);
      return setTranslatePxls(translatePxls + 95);
    } else if (
      direction === "Right" &&
      activeGalloryIdx < Object.values(images[activeImageSet])[0].length - 1 &&
      window.document.body.clientWidth < 579 &&
      window.document.body.clientWidth > 479
    ) {
      setActiveGalloryIdx(activeGalloryIdx + 1);
      setTranslatePxls(translatePxls - 95);
    } else if (
      direction === "Left" &&
      activeGalloryIdx !== 2 &&
      window.document.body.clientWidth < 479 &&
      window.document.body.clientWidth > 339
    ) {
      setActiveGalloryIdx(activeGalloryIdx - 1);
      return setTranslatePxls(translatePxls + 70);
    } else if (
      direction === "Right" &&
      activeGalloryIdx < Object.values(images[activeImageSet])[0].length - 1 &&
      window.document.body.clientWidth < 479 &&
      window.document.body.clientWidth > 339
    ) {
      setActiveGalloryIdx(activeGalloryIdx + 1);
      setTranslatePxls(translatePxls - 70);
    } else if (
      direction === "Left" &&
      activeGalloryIdx !== 2 &&
      window.document.body.clientWidth < 339
    ) {
      setActiveGalloryIdx(activeGalloryIdx - 1);
      return setTranslatePxls(translatePxls + 60);
    } else if (
      direction === "Right" &&
      activeGalloryIdx < Object.values(images[activeImageSet])[0].length - 1 &&
      window.document.body.clientWidth < 339
    ) {
      setActiveGalloryIdx(activeGalloryIdx + 1);
      setTranslatePxls(translatePxls - 60);
    }
  };

  return (
    <div className="product-details-gallery-container">
      {Object.values(images[activeImageSet])[0].length > 3 ? (
        <div
          className="product-details-gallery-toggle"
          onClick={() => handleImageTransition("Left")}
        >
          <FontAwesomeIcon icon="angle-left" />
        </div>
      ) : null}

      <div className="product-details-gallery-images-wrapper">
        {Object.values(images[activeImageSet])[0].map(
          (imageSet, imageSetIdx) => {
            return (
              <img
                className="product-details-gallery-image"
                onClick={() => handleGalleryImageClick(imageSetIdx)}
                style={{
                  transform: `translate3d(${translatePxls}px, 0px, 0px)`
                }}
                key={imageSetIdx}
                alt="galloryImage"
                src={Object.values(imageSet)[0]}
              />
            );
          }
        )}
      </div>

      {Object.values(images[activeImageSet])[0].length > 3 ? (
        <div
          className="product-details-gallery-toggle toggle-right"
          onClick={() => handleImageTransition("Right")}
        >
          <FontAwesomeIcon icon="angle-right" />
        </div>
      ) : null}
    </div>
  );
};