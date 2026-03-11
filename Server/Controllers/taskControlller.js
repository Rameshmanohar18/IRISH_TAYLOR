const Task = require("../Models/Task")






exports.createTask = async (req, res) => {

  const task = await Task.create({
    ...req.body,  
    userId: req.user.id
  })

  res.json(task)
}

// exports.getTasks = async (req, res) => {
//   const tasks = await Task.find({ userId: req.user.id })
//   res.json(tasks)
// }

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id })
    res.json(tasks)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}




exports.updateTask = async (req, res) => {

  const task = await Task.findOneAndUpdate(   
  { _id: req.params.id, userId: req.user.id },
  req.body,
  { new: true }           
)
  res.json(task)
}

exports.deleteTask = async (req, res) => {

  await Task.findByIdAndDelete(req.params.id)

  res.json({ message: "Deleted" })
}