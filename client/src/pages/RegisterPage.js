import {useForm} from 'react-hook-form'

function RegisterPage() {

    const {register, handleSubmit} = useForm()

    return (
        <div>
            <form onSubmit={ handleSubmit(values => console.log(values)) }>
                <input 
                    type='text'
                    placeholder='Username'
                    {...register('username', {required: true})} 
                />
                <input 
                    type='email' 
                    placeholder='Email'
                    {...register('email', {required: true})} 
                />
                <input 
                    type='password' 
                    placeholder='Password'
                    {...register('password', {required: true, minLength: 6})} 
                />
                <button type='submit'>Register</button>
            </form>
        </div>
    )
}

export default RegisterPage