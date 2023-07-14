import React from 'react'
import {useForm} from 'react-hook-form'
import {useNavigate} from 'react-router-dom'
import { useAuth } from '../context/AuthContext.js'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

function LoginPage() {
    const {register, handleSubmit, formState: {errors}} = useForm()
    const {signIn, isAuthenticated, errors: loginErrors, clearErrors} = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        clearErrors()
    }, [])

    useEffect(() => {
        if(isAuthenticated) navigate('/tasks')
    }, [isAuthenticated])

    const onSubmit = handleSubmit(async (values) => {
        signIn(values)
    })

    return (
        <div className='container register-page'>
            <form className='row' onSubmit={onSubmit}>
                <h1>Login</h1>
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
                {loginErrors.length > 0 && <div className='register-page-errors'>
                    {loginErrors.map((error, i) => (
                        <div key={i}>{error.message}</div>
                    ))}
                </div>
                }
                {loginErrors.message && <div className='register-page-errors'>
                    <div>{loginErrors.message}</div>
                </div>
                }
                <button type='submit'>Login</button>
            </form>
            <div className='mt-3'>
                Don't you have an account? <Link to='/register'>Sign up</Link>
            </div>
        </div>
    )
}

export default LoginPage