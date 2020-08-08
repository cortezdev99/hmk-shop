import React, { useState } from 'react'
import CartContext from '../Contexts/CartContext'

export default (props) => {
  const [ isCartOpen, setIsCartOpen ] = useState(false)
  const [ products, setProducts ] = useState([])

  const state = {
    isCartOpen,
    setIsCartOpen,
    products,
    setProducts
  }

  return (
    <CartContext.Provider value={state}>
      {props.children}
    </CartContext.Provider>
  )
}