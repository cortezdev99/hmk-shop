import React, { useState } from 'react'

export default () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
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
        <div>
          Why it's required
        </div>
      </div>
    </div>
  )
}