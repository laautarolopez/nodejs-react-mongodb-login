import { useState, createContext, useContext } from "react";
import { getTasksRequest, getTaskRequest, createTaskRequest, updateTaskRequest, deleteTaskRequest } from '../api/tasks.js'

const TaskContext = createContext()

export const useTasks = () => {
    const context = useContext(TaskContext)
    if(!context) throw new Error("useTasks must be used within an TaskProvider")

    return context
}

export const TaskProvider = ({children}) => {
    const [tasks, setTasks] = useState([])
    const [loading, setLoading] = useState(true)

    const createTask = async (task) => {
        const res = await createTaskRequest(task)
        console.log(res)
    }

    const getTasks = async () => {
        try {
            const res = await getTasksRequest()
            setTasks(res.data)
            setLoading(false)
        } catch(error) {
            console.error(error)
        }
    }

    return(
        <TaskContext.Provider value={{tasks, createTask, getTasks, loading}}>
            {children}
        </TaskContext.Provider>
    )
}