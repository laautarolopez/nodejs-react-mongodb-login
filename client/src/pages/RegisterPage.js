import {useForm} from 'react-hook-form'
import {useNavigate} from 'react-router-dom'
import { useAuth } from '../context/AuthContext.js'
import { useEffect } from 'react'

function RegisterPage() {
    const {register, handleSubmit, formState: {errors}} = useForm()
    const {signUp, isAuthenticated, errors: registerErrors} = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if(isAuthenticated) navigate('/tasks')
    }, [isAuthenticated])

    const onSubmit = handleSubmit(async (values) => {
        signUp(values)
    })

    return (
        <div>
            {registerErrors.map((error, i) => (
                <div key={i}>{error.message}</div>
            ))}
            <form onSubmit={onSubmit}>
                <input 
                    type='text'
                    placeholder='Username'
                    {...register('username', {required: true})} 
                />
                {errors.username && <p>Username is required</p>}
                <input 
                    type='email' 
                    placeholder='Email'
                    {...register('email', {required: true})} 
                />
                {errors.email && <p>Email is required</p>}
                <input 
                    type='password' 
                    placeholder='Password'
                    {...register('password', {required: true})} 
                />
                {errors.password && <p>Password is required</p>}
                <button type='submit'>Register</button>
            </form>
        </div>
    )
}

export default RegisterPage