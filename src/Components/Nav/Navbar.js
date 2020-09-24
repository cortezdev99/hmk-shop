import React, { useEffect, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import CartContext from '../../Contexts/CartContext'
import TotalsLogicProvider from '../../Providers/TotalsLogicProvider'

export default () => {
  const {
    setIsCartOpen,
    products
  } = useContext(CartContext)
  
  const handleCartToggle = () => {
    const htmlElement = document.getElementById('html')
    htmlElement.classList.toggle('html-overflow-hidden')
    setIsCartOpen(true)
  }

  const handleGettingProductAmount = () => {
    const itemsTotal = products.reduce((accum, currentVal) => {
      return accum += currentVal[4].quantity
    }, 0)

    return `${itemsTotal}`
  }
  
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
        <NavLink to="/sale" className="navbar-link">Sale</NavLink>
        <div
          className="navbar-link"
          onClick={handleCartToggle}
        >
          Cart ({handleGettingProductAmount()})
        </div>
      </div>
    </div>
  )
}