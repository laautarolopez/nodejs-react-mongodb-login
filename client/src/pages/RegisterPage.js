import './css/RegisterPage.css'
import {useForm} from 'react-hook-form'
import {useNavigate} from 'react-router-dom'
import { useAuth } from '../context/AuthContext.js'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

function RegisterPage() {
    const {register, handleSubmit, formState: {errors}} = useForm()
    const {signUp, isAuthenticated, errors: registerErrors, clearErrors} = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        clearErrors()
    }, [])

    useEffect(() => {
        if(isAuthenticated) navigate('/tasks')
    }, [isAuthenticated])

    const onSubmit = handleSubmit(async (values) => {
        signUp(values)
    })

    return (
        <div className='container register-page'>
            <form className='row' onSubmit={onSubmit}>
                <h1>Register</h1>
                <input 
                    type='text'
                    placeholder='Username'
                    {...register('username', {required: true})} 
                />
                {errors.username && <p className='register-page-input-error'>Username is required</p>}
                <input 
                    type='email' 
                    placeholder='Email'
                    {...register('email', {required: true})} 
                />
                {errors.email && <p className='register-page-input-error'>Email is required</p>}
                <input 
                    type='password' 
                    placeholder='Password'
                    {...register('password', {required: true})} 
                />
                {errors.password && <p className='register-page-input-error'>Password is required</p>}
                {registerErrors.length > 0 && <div className='register-page-errors'>
                    {registerErrors.map((error, i) => (
                        <div key={i}>{error.message}</div>
                    ))}
                </div>
                }
                <button type='submit'>Register</button>
            </form>
            <div className='mt-3'>
                Already have an account? <Link to='/login'>Login</Link>
            </div>
        </div>
    )
}

export default RegisterPage