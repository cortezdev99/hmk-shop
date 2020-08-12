import React from 'react'

export default (props) => {
  // const {
    
  // } = props.location.cartProps.products

  return (
    <div>
      <div>
        <img
          src="https://via.placeholder.com/1900x646"
          style={{ height: "40%", maxHeight: "200px", backgroundSize: "cover", width: "100%" }}
        />
      </div>

      <div style={{ padding: "0 80px", display: "grid", gridTemplateColumns: "1fr 1fr" }}>
        <div>
            <div>
              <div>
                Express Checkout
              </div>
            </div>
        </div>

        <div>
            Right
        </div>
      </div>
    </div>
  )
}