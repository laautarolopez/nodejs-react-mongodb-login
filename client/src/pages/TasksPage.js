import { useEffect } from "react"
import { useTasks } from "../context/TasksContext.js"

function TasksPage() {
    const {getTasks, tasks, loading} = useTasks()

    useEffect(() => {
        getTasks()
    }, [])

    if(loading) return;

    return (
        <div className="container tasks-page">
            <div className="row">
                {tasks.length === 0
                    ? <h1>No tasks</h1>
                    : tasks.map(task => (
                        <div key={task._id}>
                            {task.title}
                            {task.description}
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default TasksPage