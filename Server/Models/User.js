// const mongoose = require("mongoose")

// const UserSchema = new mongoose.Schema({
//   email: { type: String, unique: true },
//   password: String,
//   createdAt: {
//     type: Date,
//     default: Date.now
//   }
// })

// module.exports = mongoose.model("User", UserSchema)

const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },

  password: {
    type: String,
    required: true
  },

  gender: {
    type: String,
    enum: ["male", "female", "other"],
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model("User", UserSchema)