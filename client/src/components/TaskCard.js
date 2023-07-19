import './css/TaskCard.css'
import { useTasks } from '../context/TasksContext.js'
import { Link } from 'react-router-dom'

function TaskCard({task}) {
    const {deleteTask} = useTasks()

    return (
        <div className="col-12 col-md-6 col-lg-4 p-3">
            <div className='taskcard'>
                <h1>{task.title}</h1>
                <p>{task.description}</p>
                <p>{new Date(task.date).toLocaleDateString()}</p>
                <div className='taskcard-buttons'>
                    <Link to={`/tasks/${task._id}`}>Edit</Link>
                    <button onClick={() => deleteTask(task._id)}>Delete</button>
                </div>
            </div>
        </div>
    )
}

export default TaskCard