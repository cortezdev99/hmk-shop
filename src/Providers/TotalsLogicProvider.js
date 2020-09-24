import React, { useState } from 'react'
import TotalsLogicContext from '../Contexts/TotalsLogicContext'

export default (props) => {
  const [ subtotal, setSubtotal ] = useState(false)
  const [ freeShipping, setFreeShipping ] = useState([])

  const state = {
    subtotal,
    setSubtotal,
    freeShipping,
    setFreeShipping
  }

  return (
    <TotalsLogicContext.Provider value={state}>
      {props.children}
    </TotalsLogicContext.Provider>
  )
}