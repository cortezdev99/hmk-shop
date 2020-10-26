import React, { useState, useReducer, useContext, useEffect } from "react";
import MobileSideNavContext from "../../Contexts/MobileSideNavContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";

export default () => {
  const { isSideNavOpen, setIsSideNavOpen } = useContext(MobileSideNavContext);

  useEffect(() => {
    const mobileSideNavWrapperElement = document.getElementById(
      "mobile-side-nav-wrapper"
    );
    const mobileSideNavMainContentWrapperElement = document.getElementById(
      "mobile-side-nav-main-content"
    );
    const mobileSideNavFooterWrapperElement = document.getElementById(
      "mobile-side-nav-footer-wrapper"
    );
    if (isSideNavOpen) {
      mobileSideNavWrapperElement.classList.toggle("side-nav-slide");
      mobileSideNavMainContentWrapperElement.classList.toggle("side-nav-main-content-slide");
      mobileSideNavFooterWrapperElement.classList.toggle("side-nav-footer-slide")
    }
  }, [isSideNavOpen]);

  const handleCloseMobileSideNav = () => {
    const htmlElement = document.getElementById("html");
    const mobileSideNavWrapperElement = document.getElementById(
      "mobile-side-nav-wrapper"
    );
    mobileSideNavWrapperElement.classList.toggle("side-nav-slide");

    setTimeout(() => {
      htmlElement.classList.toggle("html-overflow-hidden");
      setIsSideNavOpen(false);
    }, 700);
  };

  const handleCollapsableLinkClick = (innerContentId, spinElem1, spinElem2) => {
    const el = document.getElementById(innerContentId);
    const el2 = document.getElementById(spinElem1);
    const el3 = document.getElementById(spinElem2);
    el.classList.toggle("open-content");
    el2.classList.toggle("spin");
    el3.classList.toggle("spin");
  };

  if (!isSideNavOpen) {
    return <></>;
  }

  return (
    <div
      style={{
        position: "fixed",
        backgroundColor: "rgba(29, 29, 29, 0.7)",
        zIndex: "1000",
        top: 0,
        bottom: 0,
        // minHeight: "100vh",
        // height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "flex-start"
      }}
    >
      <div
        id="mobile-side-nav-wrapper"
        className="mobile-side-nav-wrapper"
        style={{
          // height: "100%",
          // minHeight: "100vh",
          background: "#1c1b1b",
          color: "#fff",
          width: "80%",
          maxWidth: "570px",
          display: "flex",
          flexDirection: "column",
          transition: "height 0.5s, transform 0.5s",
          overflowX: "hidden",
          overflowY: "hidden",
          transform: "translateX(-570px)"
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "20px 40px 0px",
            boxShadow: "rgba(28,27,27,1) 0px 19px 16px 6px",
            zIndex: 1
          }}
        >
          <div
            style={{
              width: "25px",
              height: "25px",
              marginLeft: "-4px",
              cursor: "pointer"
            }}
            onClick={handleCloseMobileSideNav}
          >
            <svg
              style={{ width: "100%", height: "100%" }}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-x"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </div>
        </div>

        <div
          id="mobile-side-nav-main-content"
          className="mobile-side-nav-main-content"
          style={{
            padding: "20px 40px",
            fontSize: "14px",
            height: `calc(100% - 90px`,
            overflowY: "auto",
            overflowX: "hidden",
            transform: "translateX(-570px)",
            transition: "transform 0.7s"
          }}
        >
          <div style={{ fontWeight: "400", letterSpacing: "0.2em" }}>
            <div
              style={{
                borderBottom: "1px solid rgba(255,255,255,0.25)",
                padding: "20px 0"
              }}
            >
              <NavLink
                style={{
                  textDecoration: "none",
                  color: "#fff"
                }}
                exact
                to="/"
                onClick={handleCloseMobileSideNav}
              >
                New Arrivals
              </NavLink>
            </div>

            <div
              style={{
                borderBottom: "1px solid rgba(255,255,255,0.25)",
                padding: "20px 0"
              }}
            >
              <NavLink
                style={{
                  textDecoration: "none",
                  color: "#fff"
                }}
                to="/best-sellers"
                onClick={handleCloseMobileSideNav}
              >
                Best Sellers
              </NavLink>
            </div>

            <div
              id="all-apparel-wrapper"
              className="all-apparel-wrapper"
              style={{
                borderBottom: "1px solid rgba(255,255,255,0.25)",
                maxHeight: "58px",
                overflow: "hidden",
                transition: "max-height 0.7s"
              }}
            >
              <div
                style={{
                  padding: "20px 0",
                  display: "flex",
                  justifyContent: "space-between",
                  cursor: "pointer"
                }}
                onClick={() =>
                  handleCollapsableLinkClick(
                    "all-apparel-wrapper",
                    "all-apparel-spinner-1",
                    "all-apparel-spinner-2"
                  )
                }
              >
                <div>All Apparel</div>

                <div style={{ position: "relative", width: "12px" }}>
                  <div
                    id="all-apparel-spinner-1"
                    className="all-apparel-spinner-1"
                    style={{
                      transition: "0.7s",
                      position: "absolute",
                      right: "2px",
                      bottom: "0px",
                      transform: "rotate(90deg)"
                    }}
                  >
                    |
                  </div>

                  <div
                    id="all-apparel-spinner-2"
                    className="all-apparel-spinner-2"
                    style={{
                      transition: "0.7s",
                      position: "absolute",
                      transform: "rotate(180deg)"
                    }}
                  >
                    |
                  </div>
                </div>
              </div>

              <div style={{ padding: "0 20px" }}>
                <div style={{ paddingBottom: "20px" }}>Shop All</div>

                <div style={{ paddingBottom: "20px" }}>Hoodies</div>

                <div style={{ paddingBottom: "20px" }}>T-Shirts</div>

                <div style={{ paddingBottom: "20px" }}>Tops</div>

                <div style={{ paddingBottom: "20px" }}>Jackets</div>

                <div style={{ paddingBottom: "20px" }}>Shorts</div>

                <div style={{ paddingBottom: "20px" }}>Sweats</div>
              </div>
            </div>

            <div
              style={{
                borderBottom: "1px solid rgba(255,255,255,0.25)",
                padding: "20px 0"
              }}
            >
              <NavLink
                style={{
                  textDecoration: "none",
                  color: "#fff"
                }}
                to="/sale"
                onClick={handleCloseMobileSideNav}
              >
                Sale
              </NavLink>
            </div>
          </div>

          <div
            style={{
              marginTop: "20px"
            }}
          >
            <div
              style={{
                color: "rgba(255,255,255,0.5)",
                paddingBottom: "20px"
              }}
            >
              <div style={{ cursor: "pointer", display: "inline-block" }}>
                FAQ & Shipping/Returns
              </div>
            </div>

            <div
              style={{
                color: "rgba(255,255,255,0.5)",
                paddingBottom: "20px"
              }}
            >
              <div style={{ cursor: "pointer", display: "inline-block" }}>
                Privacy Policy
              </div>
            </div>

            <div
              style={{
                color: "rgba(255,255,255,0.5)",
                paddingBottom: "20px"
              }}
            >
              <div style={{ cursor: "pointer", display: "inline-block" }}>
                Accessability
              </div>
            </div>

            <div
              style={{
                color: "rgba(255,255,255,0.5)",
                paddingBottom: "20px"
              }}
            >
              <div style={{ cursor: "pointer", display: "inline-block" }}>
                Wholesale Inquires
              </div>
            </div>

            <div
              style={{
                color: "rgba(255,255,255,0.5)",
                paddingBottom: "20px"
              }}
            >
              <div style={{ cursor: "pointer", display: "inline-block" }}>
                Account
              </div>
            </div>
          </div>
        </div>

          <div
            id="mobile-side-nav-footer-wrapper"
            className="mobile-side-nav-footer-wrapper"
            style={{
              height: "45px",
              fontSize: "20px",
              paddingBottom: "15px",
              position: "fixed",
              bottom: "0",
              width: "100%",
              boxShadow: "rgb(28, 27, 27) 0px -19px 16px 6px",
              zIndex: 1,
              transform: "translateY(145px)",
              transition: "transform 0.7s",
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
              overflow: "hidden"
            }}
          >

            <div style={{ cursor: "pointer" }}>
              <FontAwesomeIcon icon={["fab", "instagram"]} />
            </div>

            <div style={{ cursor: "pointer" }}>
              <FontAwesomeIcon icon={["fab", "facebook-f"]} />
            </div>

            <div style={{ cursor: "pointer" }}>
              <FontAwesomeIcon icon={["fab", "twitter"]} />
            </div>
          </div>
        </div>
      {/* </div> */}
    </div>
  );
};
