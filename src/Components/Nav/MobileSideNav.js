import React, { useContext } from "react";
import MobileSideNavContext from "../../Contexts/MobileSideNavContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default () => {
  const { isSideNavOpen, setIsSideNavOpen } = useContext(MobileSideNavContext);

  const handleCloseMobileSideNav = () => {
    setIsSideNavOpen(false);
  };

  const handleClick = () => {
    const el = document.getElementById('test')
    el.classList.toggle('open-content')
  }

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
        style={{
          height: "100%",
          minHeight: "100vh",
          background: "#1c1b1b",
          color: "#fff",
          width: "80%",
          maxWidth: "570px",
          display: "flex",
          flexDirection: "column",
          transition: "height 0.5s, transform 0.5s"
        }}
      >
        <div
          style={{
            height: "60px",
            display: "flex",
            alignItems: "center",
            padding: "28px 40px 0px", 
            height: "10%"
          }}
        >
          <div
            style={{ fontSize: "24px" }}
            onClick={handleCloseMobileSideNav}
          >
            <FontAwesomeIcon icon="times" />
          </div>
        </div>

        <div style={{ padding: "0 40px", fontSize: "14px", height: "80%" }}>
          <div style={{ fontWeight: "400", letterSpacing: "0.2em" }}>
            <div id="test" class="test" style={{ borderBottom: "1px solid rgba(255,255,255,0.25)", maxHeight: "58px", overflow: "hidden" }}>
              <div
                style={{
                  padding: "20px 0",
                  display: "flex",
                  justifyContent: "space-between"
                }}

                onClick={handleClick}
              >
                <div>
                  New Arrivals
                </div>

                <div style={{ position: "relative", width: "12px" }}>
                  <div style={{ transition: "0.7s", position: "absolute", right: "2px", transform: "rotate(90deg)" }}>
                    |
                  </div>

                  <div style={{ transition: "0.7s", position: "absolute", transform: "rotate(180deg)" }}>
                    |
                  </div>
                </div>
              </div>

              <div style={{ padding: "0 20px" }}>
                <div style={{ paddingBottom: "20px" }}>
                  Shop All
                </div>

                <div style={{ paddingBottom: "20px" }}>
                  Hoodies
                </div>

                <div style={{ paddingBottom: "20px" }}>
                  T-Shirts
                </div>

                <div style={{ paddingBottom: "20px" }}>
                  Tops
                </div>

                <div style={{ paddingBottom: "20px" }}>
                  Jackets
                </div>

                <div style={{ paddingBottom: "20px" }}>
                  Shorts
                </div>

                <div style={{ paddingBottom: "20px" }}>
                  Sweats
                </div>
              </div>
            </div>

            <div>
              <div
                style={{
                  padding: "20px 0",
                  borderBottom: "1px solid rgba(255,255,255,0.25)",
                  display: "flex",
                  justifyContent: "space-between"
                }}
              >
                <div>
                  Best Sellers
                </div>

                <div style={{ position: "relative", width: "12px" }}>
                  <div style={{ transition: "0.7s", position: "absolute", right: "2px", transform: "rotate(90deg)" }}>
                    |
                  </div>

                  <div style={{ transition: "0.7s", position: "absolute", transform: "rotate(180deg)" }}>
                    |
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div
                style={{
                  padding: "20px 0",
                  borderBottom: "1px solid rgba(255,255,255,0.25)",
                  display: "flex",
                  justifyContent: "space-between"
                }}
              >
                <div>
                  All Apparel
                </div>

                <div style={{ position: "relative", width: "12px" }}>
                  <div style={{ transition: "0.7s", position: "absolute", right: "2px", transform: "rotate(90deg)" }}>
                    |
                  </div>

                  <div style={{ transition: "0.7s", position: "absolute", transform: "rotate(180deg)" }}>
                    |
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div
                style={{
                  padding: "20px 0",
                  borderBottom: "1px solid rgba(255,255,255,0.25)",
                  display: "flex",
                  justifyContent: "space-between"
                }}
              >
                <div>
                  Sale
                </div>

                <div style={{ position: "relative", width: "12px" }}>
                  <div style={{ transition: "0.7s", position: "absolute", right: "2px", transform: "rotate(90deg)" }}>
                    |
                  </div>

                  <div style={{ transition: "0.7s", position: "absolute", transform: "rotate(180deg)" }}>
                    |
                  </div>
                </div>
              </div>
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
