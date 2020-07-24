import React from 'react'

export default () => {
  return (
    <div style={{ width: "100%", position: "fixed", top: 0 }}>
      <div style={{ width: "100%", height: "80px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        HMK Shop
      </div>

      <div style={{ width: "100%", display: "flex", justifyContent: "space-evenly" }}>
        <div>New Arrivals</div>
        <div>All Apparel</div>
        <div>Account</div>
        <div>Cart</div>
      </div>
    </div>
  )
}