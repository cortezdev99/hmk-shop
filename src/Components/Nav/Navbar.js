import React from 'react'

export default () => {
  return (
    <div style={{ width: "100%", position: "fixed", top: 0, background: "#f6f6f6" }}>
      <div style={{ width: "100%", height: "80px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        HMK Shop
      </div>

      <div style={{ width: "100%", height: "40px", display: "flex", justifyContent: "space-evenly", alignItems: "center" }}>
        <div>New Arrivals</div>
        <div>All Apparel</div>
        <div>Account</div>
        <div>Cart</div>
      </div>
    </div>
  )
}