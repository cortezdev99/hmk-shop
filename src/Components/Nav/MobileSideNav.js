import React, { useContext, useEffect } from "react";
import MobileSideNavContext from "../../Contexts/MobileSideNavContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";

export default () => {
  const { isSideNavOpen, setIsSideNavOpen } = useContext(MobileSideNavContext);

  useEffect(() => {
    const mobileSideNavWrapperElement = document.getElementById(
      "mobile-side-nav-wrapper"
    );
    const mobileSideNavSlideAnimElement = document.getElementsByClassName(
      "side-nav-slide"
    );
    if (isSideNavOpen && mobileSideNavSlideAnimElement.length === 0) {
      mobileSideNavWrapperElement.classList.toggle("side-nav-slide");
    }
  });

  const handleCloseMobileSideNav = () => {
    setIsSideNavOpen(false);
  };

  const handleClick = (innerContentId, spinElem1, spinElem2) => {
    const el = document.getElementById(innerContentId);
    const el2 = document.getElementById(spinElem1);
    const el3 = document.getElementById(spinElem2);
    el.classList.toggle("open-content");
    el2.classList.toggle("spin");
    el3.classList.toggle("spin");
  };

  const handleCloseNav = () => {
    setIsSideNavOpen(false);
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
        minHeight: "100vh",
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "flex-start"
      }}
    >
      <div
        id="mobile-side-nav-wrapper"
        class="mobile-side-nav-wrapper"
        style={{
          height: "100%",
          minHeight: "100vh",
          background: "#1c1b1b",
          color: "#fff",
          width: "80%",
          maxWidth: "570px",
          display: "flex",
          flexDirection: "column",
          transition: "height 0.5s, transform 0.5s",
          overflowX: "hidden",
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
            style={{ width: "25px", height: "25px" }}
            onClick={handleCloseMobileSideNav}
          >
            <svg
              style={{ width: "100%", height: "100%" }}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-x"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </div>
        </div>

        <div
          className="mobileSideNavMainContent"
          style={{
            padding: "0 40px",
            fontSize: "14px",
            height: "calc(90% - 45px)",
            overflowY: "auto",
            overflowX: "hidden",
            paddingTop: "20px"
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
                onClick={handleCloseNav}
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
                onClick={handleCloseNav}
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
                  justifyContent: "space-between"
                }}
                onClick={() =>
                  handleClick(
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
                onClick={handleCloseNav}
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
              FAQ & Shipping/Returns
            </div>

            <div
              style={{
                color: "rgba(255,255,255,0.5)",
                paddingBottom: "20px"
              }}
            >
              Privacy Policy
            </div>

            <div
              style={{
                color: "rgba(255,255,255,0.5)",
                paddingBottom: "20px"
              }}
            >
              Accessability
            </div>

            <div
              style={{
                color: "rgba(255,255,255,0.5)",
                paddingBottom: "20px"
              }}
            >
              Wholesale Inquires
            </div>

            <div
              style={{
                color: "rgba(255,255,255,0.5)",
                paddingBottom: "20px"
              }}
            >
              Account
            </div>
          </div>
        </div>

        <div style={{ height: "10%" }}>test</div>
      </div>
    </div>
  );
};
