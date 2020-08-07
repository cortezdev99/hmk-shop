import React, { useState } from 'react'
import CartContext from '../Contexts/CartContext'

export default (props) => {
  const [ isCartOpen, setIsCartOpen ] = useState(false)

  const state = {
    isCartOpen,
    setIsCartOpen
  }
  
  return (
    <CartContext.Provider value={state}>
      {props.children}
    </CartContext.Provider>
  )
}