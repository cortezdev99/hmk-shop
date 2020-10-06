import React, { useState } from 'react'
import MobileSideNavContext from '../Contexts/MobileSideNavContext'

export default (props) => {
  const [ isSideNavOpen, setIsSideNavOpen ] = useState(false)

  const state = {
    isSideNavOpen,
    setIsSideNavOpen
  }

  return (
    <MobileSideNavContext.Provider value={state}>
      {props.children}
    </MobileSideNavContext.Provider>
  )
}