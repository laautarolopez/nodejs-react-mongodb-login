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

    const updateTask = async (task) => {
        try {
            const res = updateTaskRequest(task)
        } catch(error) {

        }
    }

    const deleteTask = async (id) => {
        try {
            const res = await deleteTaskRequest(id)
            if(res.status === 204) {
                const tasksUpdated = tasks.filter(task => task._id != id)
                setTasks(tasksUpdated)
            }
        } catch(error) {
            console.log(error)
        }
    }

    return(
        <TaskContext.Provider value={{tasks, createTask, getTasks, updateTask, deleteTask, loading}}>
            {children}
        </TaskContext.Provider>
    )
}