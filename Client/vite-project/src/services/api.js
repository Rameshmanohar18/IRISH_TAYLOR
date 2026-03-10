import axios from "axios"

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json"
  }
})


API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token") 
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