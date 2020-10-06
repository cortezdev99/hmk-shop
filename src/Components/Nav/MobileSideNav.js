import React, { useContext } from "react";
import MobileSideNavContext from "../../Contexts/MobileSideNavContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default () => {
  const { isSideNavOpen, setIsSideNavOpen } = useContext(MobileSideNavContext);

  const handleCloseMobileSideNav = () => {
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
            padding: "28px 40px 0px"
          }}
        >
          <div style={{ fontSize: "24px" }} onClick={handleCloseMobileSideNav}>
            <FontAwesomeIcon icon="times" />
          </div>
        </div>

        <div style={{ padding: "0 40px", fontSize: "14px" }}>
          <div style={{ fontWeight: "400", letterSpacing: "0.2em" }}>
            <div
              style={{
                padding: "20px 0",
                borderBottom: "1px solid rgba(255,255,255,0.25)",
              }}
            >
              New Arrivals
            </div>

            <div
              style={{
                padding: "20px 0",
                borderBottom: "1px solid rgba(255,255,255,0.25)",
              }}
            >
              Best Sellers
            </div>

            <div
              style={{
                padding: "20px 0",
                borderBottom: "1px solid rgba(255,255,255,0.25)",
              }}
            >
              All Apparel
            </div>

            <div
              style={{
                padding: "20px 0",
                borderBottom: "1px solid rgba(255,255,255,0.25)",
              }}
            >
              Sale
            </div>
          </div>

          <div style={{
            marginTop: "20px",
          }}>
            <div style={{ 
              color: "rgba(255,255,255,0.5)",
              paddingBottom: "20px"
             }}>
              FAQ & Shipping/Returns
            </div>

            <div style={{ 
              color: "rgba(255,255,255,0.5)",
              paddingBottom: "20px"
             }}>
              Privacy Policy
            </div>

            <div style={{ 
              color: "rgba(255,255,255,0.5)",
              paddingBottom: "20px"
             }}>
              Accessability
            </div>

            <div style={{ 
              color: "rgba(255,255,255,0.5)",
              paddingBottom: "20px"
             }}>
              Wholesale Inquires
            </div>

            <div style={{ 
              color: "rgba(255,255,255,0.5)",
              paddingBottom: "20px"
             }}>
              Account
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
