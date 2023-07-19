import { useEffect } from "react"
import { useTasks } from "../context/TasksContext.js"
import TaskCard from "../components/TaskCard.js"

function TasksPage() {
    const {getTasks, tasks, loading} = useTasks()

    useEffect(() => {
        getTasks()
    }, [])

    if(loading) return;

    return (
        <div className="container tasks-page">
            <div className="row p-3">
                {tasks.length === 0
                    ? <h1>No tasks</h1>
                    : tasks.map(task => (
                        <TaskCard task={task} key={task._id} />
                    ))
                }
            </div>
        </div>
    )
}

export default TasksPage