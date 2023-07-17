import { useAuth } from "../context/AuthContext.js"

function TasksPage() {
  const {user} = useAuth()

  return (
    <div>TasksPage</div>
  )
}

export default TasksPage