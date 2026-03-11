require("dotenv").config()
const express = require("express")
const cors = require("cors")
const connectDB = require("./Config/db")

const authRoutes = require("./routes/authRoutes")
const taskRoutes = require("./routes/taskRoutes")

const app = express()                          
     

connectDB()

const secret = process.env.JWT_SECRET                      

if (!secret) {
  throw new Error("JWT_SECRET missing in .env")
}

console.log(process.env.JWT_SECRET)

app.use(cors())   
app.use(express.json())
console.log(process.env.MONGO_URI)


app.use("/api/auth", authRoutes)
app.use("/api/tasks", taskRoutes)


app.get("/", (req,res)=>{
  res.send("Server is working")
})
                                                  
const PORT = process.env.port || 5000

app.listen(PORT, () =>
  console.log(`Server running on the PORT is:- ${PORT}`)
)