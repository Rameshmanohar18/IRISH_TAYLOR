// const User = require("../Models/User")
// const bcrypt = require("bcryptjs")
// const jwt = require("jsonwebtoken")

// exports.signup = async (req, res) => {

//   const { email, password } = req.body

//   const hash = await bcrypt.hash(password, 10)

//   const user = await User.create({
//     email,
//     password: hash
//   })

//   res.json(user)
// }

// exports.login = async (req, res) => {

//   const { email, password } = req.body

//   const user = await User.findOne({ email })

//   const valid = await bcrypt.compare(password, user.password)

//   if (!valid) return res.status(400).json({ message: "Invalid credentials" })

//   const token = jwt.sign(
//     { id: user._id },
//     process.env.JWT_SECRET
//   )

//   res.json({ token })
// }   

const User = require("../Models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

// SIGNUP
exports.signup = async (req, res) => {
  try {

    const { name, username, email, password, gender } = req.body

    // validation
    if (!name || !username || !email || !password || !gender) {
      return res.status(400).json({ message: "All fields are required" })
    }

    // check existing user
    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    })

    if (existingUser) {
      return res.status(400).json({
        message: "Email or Username already exists"
      })
    }

    // hash password
    const hash = await bcrypt.hash(password, 10)

    // create user
    const user = await User.create({
      name,
      username,
      email,
      password: hash,
      gender
    })

    // create token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    )

    res.json({
      message: "Signup successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        gender: user.gender
      }
    })

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}


// LOGIN
exports.login = async (req, res) => {
  try {

    const { email, password } = req.body

    // find user
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({
        message: "User not found"
      })
    }

    // compare password
    const valid = await bcrypt.compare(password, user.password)

    if (!valid) {
      return res.status(400).json({
        message: "Invalid credentials"
      })
    }

    // create token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    )

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        gender: user.gender
      }
    })

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}