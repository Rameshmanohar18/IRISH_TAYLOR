import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import { isLoggedIn } from "./Utils/auth.js"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={isLoggedIn() ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login navigate={(path)=>window.location.href=path} />} />
        <Route path="/signup" element={<Signup navigate={(path)=>window.location.href=path} />} />
        <Route path="/dashboard" element={isLoggedIn() ? <Dashboard navigate={(path)=>window.location.href=path} /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  )
}

export default App