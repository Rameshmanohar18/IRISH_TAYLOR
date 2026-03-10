import { useEffect, useState } from "react"
import API from "../services/api"
import TaskItem from "../components/TaskItem"
import { removeToken } from "../Utils/auth.jsx"
import { saveTasksOffline, getTasksOffline } from "../services/storage"
import Switch from "react-switch"
// import { useTheme } from "../Utils/theme.jsx"
import Calendar from "react-calendar"
import 'react-calendar/dist/Calendar.css'
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition"
import { useNavigate } from "react-router-dom"

export default function Dashboard() {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState("")
  const [dueDate, setDueDate] = useState(null)
  const [error, setError] = useState("")
  // const {darkMode, setDarkMode } = useTheme()
  const navigate = useNavigate()

  const { transcript, resetTranscript, listening } = useSpeechRecognition()

  // Fetch tasks from API or fallback offline
  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks")
      setTasks(res.data)
      saveTasksOffline(res.data)
    } catch (err) {
      const offlineTasks = await getTasksOffline()
      setTasks(offlineTasks || [])
      console.error("Offline fallback:", err)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  // Create new task
  const createTask = async () => {
    if (!title.trim()) return
    const newTask = { title, completed: false, dueDate }
    setTasks([newTask, ...tasks]) // Optimistic UI
    setTitle(""); setDueDate(null)
    try {
      await API.post("/tasks", newTask)
      fetchTasks()
    } catch (err) {
      setError("Failed to add task")
    }
  }

  // Toggle task complete
  const toggleComplete = async (id) => {
    const updatedTasks = tasks.map(t => t._id === id ? { ...t, completed: !t.completed } : t)
    setTasks(updatedTasks)
    try {
      await API.put(`/tasks/${id}`, { completed: updatedTasks.find(t => t._id === id).completed })
      fetchTasks()
    } catch (err) {
      setError("Failed to update task")
    }
  }

  // Delete task
  const deleteTask = async (id) => {
    setTasks(tasks.filter(t => t._id !== id))
    try {
      await API.delete(`/tasks/${id}`)
      fetchTasks()
    } catch (err) {
      setError("Failed to delete task")
    }
  }

  // Logout
  const handleLogout = () => {
    removeToken()
    navigate("/login")
  }

  // Voice input
  const startVoiceInput = () => {
    resetTranscript()
    SpeechRecognition.startListening({ continuous: false })
  }
  const applyVoiceInput = () => {
    if (transcript.trim()) setTitle(transcript)
    resetTranscript()
  }

  return (
    <div  style={{
      // background: darkMode ? "#1e1e1e" : "#fff",
      // color: darkMode ? "#fff" : "#000",
      minHeight: "100vh",
      padding: "20px"
    }}>
      <h2>Dashboard</h2>
      <button onClick={handleLogout}>Logout</button>

      {/* Dark mode toggle */}
      {/* <div style={{ margin: "10px 0" }}>
        Dark Mode: <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
      </div> */}

      {/* Task input */}
      <div style={{ marginBottom: "15px" }}>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="New task"
          style={{ padding: "5px", width: "60%" }}
        />
        <button onClick={createTask} style={{ marginLeft: "5px" }}>Add</button>

        {/* Voice input */}
        <button onClick={startVoiceInput} style={{ marginLeft: "5px" }}>
          {listening ? "Listening..." : "🎤 Voice"}
        </button>
        <button onClick={applyVoiceInput} style={{ marginLeft: "5px" }}>
          Apply Voice
        </button>
      </div>

      {/* Due Date */}
      <div style={{ marginBottom: "15px" }}>
        <Calendar onChange={setDueDate} value={dueDate} />
        {dueDate && <p>Selected Due Date: {dueDate.toDateString()}</p>}
      </div>

      {/* Error message */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Task list */}
      <div>
        {tasks.length === 0 ? (
          <p>No tasks yet</p>
        ) : (
          tasks.map(task => (
            <TaskItem
              key={task._id || task.id}
              task={task}
              toggleComplete={toggleComplete}
              deleteTask={deleteTask}
            />
          ))
        )}
      </div>
    </div>
  )
}