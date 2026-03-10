
import { useEffect, useState } from "react"
import API from "../services/api"
import TaskItem from "../components/TaskItem"
import { removeToken } from "../utils/auth"
import { saveTasksOffline, getTasksOffline } from "../services/storage"
import Switch from "react-switch"
import { useTheme } from "../Utils/theme"
import Calendar from "react-calendar"
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition"

export default function Dashboard({ navigate }) {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState("")
  const [dueDate, setDueDate] = useState(null)
  const [error, setError] = useState("")
  const { darkMode, setDarkMode } = useTheme()

  const { transcript, resetTranscript, listening } = useSpeechRecognition()

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks")
      setTasks(res.data)
      saveTasksOffline(res.data) // offline persistence
    } catch (err) {
      const offlineTasks = await getTasksOffline()
      setTasks(offlineTasks)
      console.error("Offline fallback:", err)
    }
  }

  useEffect(()=>{ fetchTasks() }, [])

  const createTask = async () => {
    if(!title.trim()) return
    const newTask = { title, completed: false, dueDate }
    setTasks([newTask, ...tasks]) // Optimistic UI
    setTitle(""); setDueDate(null)
    try {
      await API.post("/tasks", newTask)
      fetchTasks()
    } catch(err) { setError("Failed to add task") }
  }

  const toggleComplete = async (id) => {
    const updatedTasks = tasks.map(t => t._id === id ? {...t, completed: !t.completed} : t)
    setTasks(updatedTasks)
    try { await API.put(`/tasks/${id}`, { completed: updatedTasks.find(t=>t._id===id).completed }); fetchTasks() }
    catch(err){ setError("Failed to update task") }
  }

  const deleteTask = async (id) => {
    setTasks(tasks.filter(t=>t._id!==id))
    try { await API.delete(`/tasks/${id}`); fetchTasks() }
    catch(err){ setError("Failed to delete task") }
  }

  const handleLogout = () => { removeToken(); navigate("/login") }

  const startVoiceInput = () => {
    resetTranscript()
    SpeechRecognition.startListening({ continuous: false })
  }

  const applyVoiceInput = () => {
    setTitle(transcript)
    resetTranscript()
  }

  return (
    <div 
    
    
    
    // style={{ background: darkMode ? "#1e1e1e" : "#fff", color: darkMode ? "#fff" : "#000", minHeight: "100vh", padding: "20px" }}
    
    
    
    >
      <h2>Dashboard</h2>
      <button onClick={handleLogout}>Logout</button>
      <div style={{marginTop:"10px"}}>
        Dark Mode: <Switch checked={darkMode} onChange={()=>setDarkMode(!darkMode)} />
      </div>

      <div style={{marginTop:"20px"}}>
        <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="New task"/>
        <Calendar value={dueDate} onChange={setDueDate} />
        <button onClick={createTask}>Add</button>
        <button onClick={startVoiceInput}>🎤 Voice Input</button>
        <button onClick={applyVoiceInput}>Apply Voice</button>
        {listening && <span>Listening...</span>}
      </div>

      {error && <p style={{color:'red'}}>{error}</p>}

      <div style={{marginTop:"20px"}}>
        {tasks.map(task => (
          <TaskItem key={task._id || task.id} task={task} toggleComplete={toggleComplete} deleteTask={deleteTask} />
        ))}
      </div>
    </div>
  )
}