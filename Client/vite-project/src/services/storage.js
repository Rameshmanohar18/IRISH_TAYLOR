import localforage from "localforage"

const taskStorage = localforage.createInstance({
  name: "tasksDB"
})

export const saveTasksOffline = async (tasks) => {
  await taskStorage.setItem("tasks", tasks)
}

export const getTasksOffline = async () => {
  const tasks = await taskStorage.getItem("tasks")
  return tasks || []
}