import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "./context/AuthContext.js"

function ProtectedRoute() {
    const {user, isAuthenticated, loading} = useAuth()

    if(loading) return;

    if(!loading && !isAuthenticated) return <Navigate to='/login' replace />
    
    return <Outlet />
}

export default ProtectedRoute