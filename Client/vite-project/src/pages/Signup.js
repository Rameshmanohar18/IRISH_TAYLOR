import { useState } from "react"
import API from "../services/api"
import { saveToken } from "../Utils/auth"

export default function Signup({ navigate }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
                               
  const handleSignup = async () => {
    try {
      const res = await API.post("/auth/signup", { email, password })
      saveToken(res.data.token)
      navigate("/dashboard")
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed")
    }
  }

  return (
    <div>
      <h2>Signup</h2>
      <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" />
      <button onClick={handleSignup}>Signup</button>
      {error && <p style={{color:'red'}}>{error}</p>}
    </div>
  )
}