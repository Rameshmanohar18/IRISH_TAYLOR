const Task = require("../Models/Task")

exports.getTasks = async (req, res) => {

  const tasks = await Task.find({
    userId: req.user.id
  })

  res.json(tasks)
}

exports.createTask = async (req, res) => {

  const task = await Task.create({
    ...req.body,  
    userId: req.user.id
  })

  res.json(task)
}

exports.updateTask = async (req, res) => {

  const task = await Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  )

  res.json(task)
}

exports.deleteTask = async (req, res) => {

  await Task.findByIdAndDelete(req.params.id)

  res.json({ message: "Deleted" })
}