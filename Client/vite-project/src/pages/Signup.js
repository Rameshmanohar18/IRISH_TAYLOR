// import { useState } from "react"
// import API from "../services/api"
// import { saveToken } from "../Utils/auth"

// export default function Signup({ navigate }) {
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [error, setError] = useState("")
                               
//   const handleSignup = async () => {
//     try {
//       const res = await API.post("/auth/signup", { email, password })
//       saveToken(res.data.token)
//       navigate("/dashboard")
//     } catch (err) {
//       setError(err.response?.data?.message || "Signup failed")
//     }
//   }

//   return (
//     <div>
//       <h2>Signup</h2>
//       <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" />
//       <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" />
//       <button onClick={handleSignup}>Signup</button>
//       {error && <p style={{color:'red'}}>{error}</p>}
//     </div>
//   )
// }

// src/pages/Signup.jsx
import { useState } from "react"
import API from "../services/api"
import { saveToken } from "../utils/auth" // lowercase folder
import { useNavigate } from "react-router-dom"

export default function Signup() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleSignup = async () => {
    if (!email.trim() || !password.trim()) {
      setError("Email and password are required")
      return
    }
    try {
      const res = await API.post("/auth/signup", { email, password })
      saveToken(res.data.token)
      navigate("/dashboard")
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed")
    }
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Signup</h2>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
        style={{ display: "block", margin: "10px 0", padding: "5px" }}
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
        style={{ display: "block", margin: "10px 0", padding: "5px" }}
      />
      <button onClick={handleSignup} style={{ padding: "5px 10px" }}>Signup</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  )
}