import { useAuth } from '../context/AuthContext'
import './css/Navbar.css'
import { Link } from "react-router-dom"

function Navbar() {
    const {isAuthenticated, user, logOut} = useAuth()

    const onClick = () => {
        logOut()
    }

    return (
        <nav>
            <Link className='navbar-title' to='/'>Tasks manager</Link>
            {isAuthenticated
                ? <>
                    <div className='navbar-user'>Welcome {user.username}</div>
                    <ul>
                        <li><Link to='/tasks'>My tasks</Link></li>
                        <li><Link to='/add-task'>Add task</Link></li>
                        <li onClick={onClick}>Logout</li>
                    </ul>
                </>
                : <ul>
                    <li><Link to='/login'>Login</Link></li>
                    <li><Link to='/register'>Register</Link></li>
                </ul>
            }
        </nav>
    )
}

export default Navbar