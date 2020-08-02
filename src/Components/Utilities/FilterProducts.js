import React from 'react';

export default (props) => {
  return (
    <div style={{ height: "80px", display: "flex", alignItems: "center", justifyContent: "space-evenly" }}>
      <div style={{ width: "60px" }} onClick={() => props.handleFilterClick('all')}>
        All
      </div>

      <div style={{ width: "60px" }} onClick={() => props.handleFilterClick('hoodies')}>
        Hoodies
      </div>

      <div style={{ width: "60px" }} onClick={() => props.handleFilterClick('sweats')}>
        Sweats
      </div>

      <div style={{ width: "60px" }} onClick={() => props.handleFilterClick('hats')}>
        Hats
      </div>
    </div>
  )
}