import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'

export default () => {
  
  useEffect(() => {
    const permElmnt = document.getElementById('navbar-wrapper-id')
    const injectedElmnt = document.getElementsByClassName('box-shadow')

    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 0 && injectedElmnt.length === 0) {
        permElmnt.classList.toggle('box-shadow')
      } else if (window.pageYOffset === 0 && injectedElmnt.length !== 0) {
        permElmnt.classList.toggle('box-shadow')
      }
    }, false);
  }, [])
    
  return (
    <div className="navbar-wrapper" id="navbar-wrapper-id">
      <div className="navbar-logo-wrapper">
        HMK Shop
      </div>

      <div className="navbar-links-wrapper">
        <NavLink exact to="/" className="navbar-link">New Arrivals</NavLink>
        <NavLink to="/best-sellers" className="navbar-link">Best Sellers</NavLink>
        <NavLink to="/all-apparel" className="navbar-link">All Apparel</NavLink>
        <NavLink to="/account" className="navbar-link">Account</NavLink>
        <NavLink to="/cart" className="navbar-link">Cart</NavLink>
      </div>
    </div>
  )
}