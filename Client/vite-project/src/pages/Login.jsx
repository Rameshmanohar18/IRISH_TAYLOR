
import { useState } from "react"
import API from "../services/api"
import { saveToken } from "../utils/auth"

export default function Login({ navigate }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", { email, password })
      saveToken(res.data.token)
      navigate("/dashboard")
    } catch (err) {
      setError(err.response?.data?.message || "Login failed")
    }
  }

  return (
   
 <div className="login-container">
      <div className="login-card">

        <h2>Welcome Back</h2>
        <p className="subtitle">Login to your account</p>

        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email Address"
        />

        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
        />

        <button onClick={handleLogin}>Login</button>

        {error && <p className="error">{error}</p>}

      </div>
    </div>
  )
  
}