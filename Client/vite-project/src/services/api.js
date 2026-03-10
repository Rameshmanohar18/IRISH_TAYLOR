


import axios from "axios"

// 1️- Create axios instance
const API = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json"
  }
})

// 2️- Request interceptor to add token automatically
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token") // read token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// 3️- Optional: Response interceptor to handle errors globally
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error("API Error:", error.response.data.message || error.message)
    } else {
      console.error("Network/Unknown Error:", error.message)
    }
    return Promise.reject(error)
  }
)

export default API