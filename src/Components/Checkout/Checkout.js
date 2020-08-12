import React, { useState } from 'react'

export default (props) => {
  const [ email, setEmail ] = useState("")
  const [ firstName, setFirstName ] = useState("")
  const [ address, setAddress ] = useState("")
  const [ address2, setAddress2 ] = useState("")
  const [ city, setCity ] = useState("")
  const [ region, setRegion ] = useState("")
  const [ state, setState ] = useState("")
  const [ zip, setZip ] = useState("")
  const [ phone, setPhone ] = useState("")
  // const {
     
  // } = props.location.cartProps.products

  return (
    <div style={{ paddingBottom: "80px" }}>
      <div>
        <img
          src="https://via.placeholder.com/1900x646"
          style={{ height: "40%", maxHeight: "200px", backgroundSize: "cover", width: "100%" }}
        />
      </div>

      <div style={{ padding: "0 80px", display: "grid", gridTemplateColumns: "1fr 1fr", gridGap: "80px" }}>
        <div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%", paddingTop: "80px" }}>
              <div style={{ width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}>
                <span style={{ marginTop: "8px", border: "1px solid #CCC", borderBottom: "none", borderRight: "none" }}></span>
                <span style={{ textAlign: "center" }}>Express Checkout</span>
                <span style={{ marginTop: "8px", border: "1px solid #CCC", borderBottom: "none", borderLeft: "none" }}></span>
              </div>

              <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid #CCC", borderTop: "none", padding: "20px" }}>
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

            <div style={{ width: "100%", paddingTop: "80px" }}>
              <div style={{ paddingBottom: "20px", fontSize: "18px" }}>Contact Information</div>

              <input
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: "100%", height: "50px" }}
              />
            </div>

            <div style={{ width: "100%", paddingTop: "80px" }}>
              <div style={{ paddingBottom: "20px", fontSize: "18px" }}>Shipping address</div>

              <div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", columnGap: "20px" }}>
                  <input
                    placeholder="First name"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    style={{ width: "100%", height: "50px" }}
                  />

                  <input
                    placeholder="Last name"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    style={{ width: "100%", height: "50px" }}
                  />
                </div>
              </div>

              <div style={{ paddingTop: "20px" }}>
                <input
                    placeholder="Address"
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    style={{ width: "100%", height: "50px" }}
                  />
              </div>

              <div style={{ paddingTop: "20px" }}>
                <input
                    placeholder="Apartment, Suite, etc. (optional)"
                    type="text"
                    value={address2}
                    onChange={(e) => setAddress2(e.target.value)}
                    style={{ width: "100%", height: "50px" }}
                  />
              </div>

              <div style={{ paddingTop: "20px" }}>
                <input
                    placeholder="City"
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    style={{ width: "100%", height: "50px" }}
                  />
              </div>

                <div style={{ paddingTop: "20px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", columnGap: "20px" }}>
                  <input
                    placeholder="Country/Region"
                    type="text"
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    style={{ width: "100%", height: "50px" }}
                  />

                  <input
                    placeholder="State"
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    style={{ width: "100%", height: "50px" }}
                  />

                  <input
                    placeholder="Zip code"
                    type="text"
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    style={{ width: "100%", height: "50px" }}
                  />
                </div>

                <div style={{ paddingTop: "20px" }}>
                  <input
                    placeholder="Phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={{ width: "100%", height: "50px" }}
                  />
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