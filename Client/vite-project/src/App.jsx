import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Signup from "./pages/Signup.jsx"
import Login from "./pages/Login.jsx"
import Dashboard from "./pages/Dashboard.jsx"
import { isLoggedIn } from "./Utils/auth.jsx"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={isLoggedIn() ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login navigate={(path)=>window.location.href=path} />} />
        <Route path="/signup" element={<Signup navigate={(path)=>window.location.href=path} />} />


        {/* <Route path="/dashboard" element={isLoggedIn() ? <Dashboard navigate={(path)=>window.location.href=path} /> : <Navigate to="/login" />} /> */}

        <Route path="/dashboard" element={<Dashboard navigate={(path)=>window.location.href=path} />} />



      </Routes>
    </Router>
  )
}

export default App