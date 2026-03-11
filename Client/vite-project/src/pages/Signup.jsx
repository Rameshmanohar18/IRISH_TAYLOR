// import { useState } from "react"
// import API from "../services/api"
// import { saveToken } from "../utils/auth"
// import { useNavigate } from "react-router-dom"

// export default function Signup() {

//   const [name, setName] = useState("")
//   const [username, setUsername] = useState("")
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [gender, setGender] = useState("")
//   const [error, setError] = useState("")

//   const navigate = useNavigate()

//   // const handleSignup = async () => {

//   //   if (!name || !username || !email || !password || !gender) {
//   //     setError("All fields are required")
//   //     return
//   //   }

//   //   try {
//   //     const res = await API.post("/auth/signup", {
//   //       name,
//   //       username,
//   //       email,
//   //       password,
//   //       gender
//   //     })

//   //     saveToken(res.data.token)
//   //     navigate("/dashboard")

//   //   } catch (err) {
//   //     setError(err.response?.data?.message || "Signup failed")
//   //   }
//   // }
//   const handleSignup = async (e) => {
//   e.preventDefault()

//   if (!name || !username || !email || !password || !gender) {
//     setError("All fields are required")
//     return
//   }

//   try {
//     const res = await API.post("/auth/signup", {
//       name,
//       username,
//       email,
//       password,
//       gender
//     })

//     saveToken(res.data.token)
//     navigate("/dashboard")

//   } catch (err) {
//     setError(err.response?.data?.message || "Signup failed")
//   }
// }

//   return (
//     <div className="signup-container" style={{ padding: "20px" }}>

//       <div className="signup-card">

//         <h2>Create Account</h2>

//         <input
//           type="text"
//           value={name}
//           onChange={e => setName(e.target.value)}
//           placeholder="Full Name"
//         />

//         <input
//           type="text"
//           value={username}
//           onChange={e => setUsername(e.target.value)}
//           placeholder="Username"
//         />

//         <input
//           type="email"
//           value={email}
//           onChange={e => setEmail(e.target.value)}
//           placeholder="Email Address"
//         />

//         <input
//           type="password"
//           value={password}
//           onChange={e => setPassword(e.target.value)}
//           placeholder="Password"
//         />

//         <select
//           value={gender}
//           onChange={e => setGender(e.target.value)}
//         >
//           <option value="">Select Gender</option>
//           <option value="male">Male</option>
//           <option value="female">Female</option>
//           <option value="other">Other</option>
//         </select>

//         <button onClick={handleSignup}>Signup</button>

//         {error && <p className="error">{error}</p>}

//       </div>

//     </div>
//   )
// }

import { useState } from "react"
import API from "../services/api"
import { saveToken } from "../utils/auth"
import { useNavigate } from "react-router-dom"
import "../signup.css"

export default function Signup() {

  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [gender, setGender] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleSignup = async (e) => {
    e.preventDefault()

    if (!name || !username || !email || !password || !gender) {
      setError("All fields are required")
      return
    }

    try {
      setLoading(true)

      const res = await API.post("/auth/signup", {
        name,
        username,
        email,
        password,
        gender
      })

      saveToken(res.data.token)
      navigate("/dashboard")

    } catch (err) {
      setError(err.response?.data?.message || "Signup failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="signup-wrapper">

      <form className="signup-card" onSubmit={handleSignup}>

        <h2>Create Account</h2>
        <p className="subtitle">Start managing your tasks today</p>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <select
          value={gender}
          onChange={e => setGender(e.target.value)}
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <button type="submit">
          {loading ? "Creating..." : "Signup"}
        </button>

        {error && <p className="error">{error}</p>}

      </form>

    </div>
  )
}