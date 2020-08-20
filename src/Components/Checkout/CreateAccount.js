import React, { useState } from 'react'

export default () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleShippingToggle = () => {
    const shippingWrapperElmnt = document.getElementById('shipping-wrapper')
    const rotatingElmnt1 = document.getElementById('rotating-plus-minus-1')
    const rotatingElmnt2 = document.getElementById('rotating-plus-minus-2')

    shippingWrapperElmnt.classList.toggle('shipping-wrapper-content-visible')
    rotatingElmnt1.classList.toggle('rotating-plus-minus-rotated')
    rotatingElmnt2.classList.toggle('rotating-plus-minus-rotated')
  }

  return (
    <div>
      <div style={{ width: "100%" }}>
        <img
          style={{ maxWidth: "100%", backgroundSize: "cover" }}
          src="https://via.placeholder.com/1900x300"
          alt="bannerImage"
        />
      </div>

      <div style={{ padding: "40px", display: "grid", gridTemplateColumns: "1.5fr 1fr", columnGap: "40px" }}>
        <div>
          <div style={{ fontSize: "20px", paddingBottom: "40px" }}>
            Create an account
          </div>

          <form>
            <div style={{ height: "50px", width: "100%", marginBottom: "40px" }}>
              <input
                style={{ width: "100%", height: "100%", borderRadius: "5px", border: "1px solid #1d1d1d" }}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
            </div>

            <div style={{ height: "50px", width: "100%", marginBottom: "40px" }}>
              <input
                style={{ width: "100%", height: "100%", borderRadius: "5px", border: "1px solid #1d1d1d" }}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </div>

            <div style={{ height: "50px" }}>
              <button style={{ height: "100%", padding: "1rem 4rem", borderRadius: "5px", border: "none", background: "#45b3e0", color: "#1d1d1d", fontWeight: "500", fontSize: "15px", cursor: "pointer" }}>
                Create
              </button>
            </div>
          </form>
        </div>

        <div>
          <div id="shipping-wrapper" className="shipping-wrapper">
            <div className="shipping-toggle-wrapper" onClick={handleShippingToggle}>
              <div className="shipping-toggle-header">
                Why it's required
              </div>

              <div className="shipping-toggle-plus-minus-wrapper">
                <div id="rotating-plus-minus-1" className="rotating-plus-minus-1">
                  |
                </div>

                <div className="rotating-plus-minus-2" id="rotating-plus-minus-2">
                  |
                </div>
              </div>
            </div>

            <div className="shipping-inner-content-wrapper">
              <div>
                <div className="shipping-inner-content-heading">
                  Double Charge Protection
                </div>

                <div>
                  <li className="shipping-inner-content-li">
                    To prevent double charges we check your account to make sure that purchase was not already made.
                  </li>
                </div>

                <div>
                  <li className="shipping-inner-content-li">
                    We do this by checking a unique identifier created on each initial site load. 
                  </li>
                </div>

                <div>
                  <li className="shipping-inner-content-li">
                    By using a unique identifier, you have the ability to purchase the same items again if desired.
                  </li>
                </div>
              </div>

              <div>
                <div className="shipping-inner-content-heading">
                  Purchase Dashboard
                </div>

                <div>
                  <li className="shipping-inner-content-li">
                    By created an account you will have access to a Purchase History Dashboard.
                  </li>
                </div>

                <div>
                  <li className="shipping-inner-content-li">
                    On this dashboard you can track the status of your purchase in three stages (Processing, Shipping, Delivered).
                  </li>
                </div>

                <div>
                  <li className="shipping-inner-content-li">
                    You can also choose to get notified when your purchase moves to the next stage.
                  </li>
                </div>
              </div>

              <div>
                <div className="shipping-inner-content-heading">
                  Discount on future purchases
                </div>

                <div>
                  <li className="shipping-inner-content-li">
                    We know it's a hassle, so we'll give you a 10% discount on all purchases after your first.
                  </li>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}