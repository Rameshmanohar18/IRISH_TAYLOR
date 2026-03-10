import { useEffect, useState } from "react"
import API from "../services/api"

export default function Dashboard() {
  const [tasks,setTasks] = useState([])
  const [title,setTitle] = useState("")

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      })
      setTasks(res.data)
    } catch (err) {
      console.error("Fetch tasks failed:", err.response?.data || err.message)
    }
  }

  useEffect(()=>{
    fetchTasks()
  },[])

  const createTask = async () => {
    if(!title.trim()) return
    try {
      await API.post("/tasks", { title }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      })
      setTitle("")
      fetchTasks()
    } catch(err) {
      console.error("Create task failed:", err.response?.data || err.message)
    }
  }

  return (
    <div>
      <h2>Tasks</h2>
      <input
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
      />
      <button onClick={createTask}>Add</button>

      {tasks.map(task=>(
        <div key={task._id || task.id}>
          {task.title}
        </div>
      ))}
    </div>
  )
}