import React from 'react'
import { NavLink } from 'react-router-dom'

export default () => {
  return (
    <div className="navbar-wrapper">
      <div className="navbar-logo-wrapper">
        HMK Shop
      </div>

      <div className="navbar-links-wrapper">
        <NavLink to="/" className="navbar-link">New Arrivals</NavLink>
        <NavLink to="/best-sellers" className="navbar-link">Best Sellers</NavLink>
        <NavLink to="/all-apparel" className="navbar-link">All Apparel</NavLink>
        <NavLink to="/account" className="navbar-link">Account</NavLink>
        <NavLink to="/cart" className="navbar-link">Cart</NavLink>
      </div>
    </div>
  )
}