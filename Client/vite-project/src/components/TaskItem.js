export default function TaskItem({ task, toggleComplete, deleteTask }) {
  return (
    <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', margin:'5px 0'}}>
      <span
        style={{ textDecoration: task.completed ? "line-through" : "none", cursor:"pointer" }}
        onClick={() => toggleComplete(task._id)}
      >
        {task.title}
      </span>
      <button onClick={() => deleteTask(task._id)}>Delete</button>
    </div>
  )
}