import './css/TaskFormPage.css'
import {useForm} from 'react-hook-form'

function TaskFormPage() {
    const {register, handleSubmit} = useForm()

    const onSubmit = handleSubmit((values) => {
        console.log(values)
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