import { createContext, useContext, useEffect, useState } from "react";
import { loginRequest, registerRequest } from '../api/auth.js'

export const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext)
    if(!context) throw new Error("useAuth must be used within an AuthProvider")

    return context
}

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [errors, setErrors] = useState([])

    useEffect(() => {
        if(errors.length > 0 || errors.message) {
            const timer = setTimeout(() => {
                setErrors([])
            }, 5000)
            return () => clearTimeout(timer)
        }
    }, [errors])

    const signUp = async (user) => {
        try {
            const res = await registerRequest(user)
            setUser(res.data)
            setIsAuthenticated(true)
        } catch(error) {
            setErrors(error.response.data)
        }
    }

    const signIn = async (user) => {
        try {
            const res = await loginRequest(user)
            setUser(res.data)
            setIsAuthenticated(true)
        } catch(error) {
            setErrors(error.response.data)
        }
    }

    const clearErrors = () => setErrors([])

    return(
        <AuthContext.Provider value={{signUp, signIn, user, isAuthenticated, errors, clearErrors}}>
            {children}
        </AuthContext.Provider>
    )
}