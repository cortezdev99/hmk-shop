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
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%", paddingTop: "80px" }}>
              <div style={{ width: "80%", display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}>
                <span style={{ marginTop: "8px", border: "1px solid #CCC", borderBottom: "none", borderRight: "none" }}></span>
                <span style={{ textAlign: "center" }}>Express Checkout</span>
                <span style={{ marginTop: "8px", border: "1px solid #CCC", borderBottom: "none", borderLeft: "none" }}></span>
              </div>

              <div style={{ width: "80%", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid #CCC", borderTop: "none", padding: "20px" }}>
                <div style={{ paddingLeft: "5px", paddingRight: "5px", width: "140px" }}>
                  <button style={{ height: "40px", width: "100%" }}>Google Pay</button>
                </div>

                <div style={{ paddingLeft: "5px", paddingRight: "5px", width: "140px" }}>
                  <button style={{ height: "40px", width: "100%" }}>Apple Pay</button>
                </div>

                <div style={{ paddingLeft: "5px", paddingRight: "5px", width: "140px" }}>
                  <button style={{ height: "40px", width: "100%" }}>Amazon Pay</button>
                </div>

                <div style={{ paddingLeft: "5px", paddingRight: "5px", width: "140px" }}>
                  <button style={{ height: "40px", width: "100%" }}>Paypal</button>
                </div>
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