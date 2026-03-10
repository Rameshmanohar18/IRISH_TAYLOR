require("dotenv").config()
const express = require("express")
const cors = require("cors")
const connectDB = require("./Config/db")

const authRoutes = require("./routes/authRoutes")
const taskRoutes = require("./routes/taskRoutes")

const app = express()
connectDB()

app.use(cors())   
app.use(express.json())
console.log(process.env.MONGO_URI)
app.use("/api/auth", authRoutes)
app.use("/api/tasks", taskRoutes)

app.listen(5000, () =>
  console.log("Server running on 5000")
)