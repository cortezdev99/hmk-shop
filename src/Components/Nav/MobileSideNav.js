import React, { useContext } from 'react'
import MobileSideNavContext from '../../Contexts/MobileSideNavContext'

export default () => {
  const { isSideNavOpen } = useContext(MobileSideNavContext);

  if (!isSideNavOpen) {
    return <></>
  }

  return (
    <div>
      test
    </div>
  )
}