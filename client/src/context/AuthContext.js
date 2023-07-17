import { createContext, useContext, useEffect, useState } from "react";
import { loginRequest, registerRequest, verifyTokenRequest } from '../api/auth.js'
import Cookies from 'js-cookie'

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
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if(errors.length > 0 || errors.message) {
            const timer = setTimeout(() => {
                setErrors([])
            }, 5000)
            return () => clearTimeout(timer)
        }
    }, [errors])

    useEffect(() => {
        async function checkLogin () {
            const cookies = Cookies.get()

            if(!cookies.token) {
                setIsAuthenticated(false)
                setUser(null)
            } else {
                try {
                    const res = await verifyTokenRequest()
                    if(!res.data) {
                        setIsAuthenticated(false)
                        setUser(null)
                        return;
                    }

                    setIsAuthenticated(true)
                    setUser(res.data)
                } catch(error) {
                    setIsAuthenticated(false)
                    setUser(null)
                }
            }
            setLoading(false)
        }

        checkLogin()
    }, [])

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
        <AuthContext.Provider value={{signUp, signIn, user, isAuthenticated, errors, clearErrors, loading}}>
            {children}
        </AuthContext.Provider>
    )
}