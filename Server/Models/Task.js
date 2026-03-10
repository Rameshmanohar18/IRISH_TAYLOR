const mongoose = require("mongoose")

const TaskSchema = new mongoose.Schema({
  title: String,
  description: String,
  completed: {
    type: Boolean,
    default: false
  },
  dueDate: Date,
  userId: mongoose.Schema.Types.ObjectId,
  createdAt: Date,
  updatedAt: Date
})

module.exports = mongoose.model("Task", TaskSchema)