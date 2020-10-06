import React, { useContext } from "react";
import MobileSideNavContext from "../../Contexts/MobileSideNavContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default () => {
  const { isSideNavOpen, setIsSideNavOpen } = useContext(MobileSideNavContext);

  const handleCloseMobileSideNav = () => {
    setIsSideNavOpen(false)
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
          background: "#fff",
          width: "80%",
          maxWidth: "570px",
          display: "flex",
          flexDirection: "column",
          // transform: "translateX(570px)",
          transition: "height 0.5s, transform 0.5s"
        }}
      >
        <div
          style={{
            height: "80px",
            padding: "0 40px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #CCC"
          }}
        >
          <div style={{ fontSize: "20px" }}>HMK shop</div>

          <div style={{ fontSize: "24px" }} onClick={handleCloseMobileSideNav}>
            <FontAwesomeIcon icon="times" />
          </div>
        </div>
      </div>
    </div>
  );
};
