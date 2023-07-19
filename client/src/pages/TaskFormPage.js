import './css/TaskFormPage.css'
import {useForm} from 'react-hook-form'
import { useTasks } from '../context/TasksContext.js'
import { useNavigate } from 'react-router-dom'

function TaskFormPage() {
    const {register, handleSubmit} = useForm()
    const {createTask} = useTasks()
    const navigate = useNavigate()

    const onSubmit = handleSubmit((values) => {
        createTask(values)
        navigate('/tasks')
    })

    return (
        <div className='container task-form-page'>
            <form className='row' onSubmit={onSubmit}>
                <h1>Add task</h1>
                <input 
                    type='text' placeholder='Title'
                    {...register('title')}
                    autoFocus
                />
                <textarea 
                    rows="3" placeholder='Description'
                    {...register('description')}
                />
                <button>Save</button>
            </form>
        </div>
    )
}

export default TaskFormPage