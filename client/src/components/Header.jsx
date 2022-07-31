import React from 'react'
import { Link,useNavigate} from 'react-router-dom'
import {FaUser,FaSignInAlt,FaSignOutAlt} from 'react-icons/fa'
import { useSelector,useDispatch } from 'react-redux'
import { reset,logout } from '../features/auth/authSlice'

const Header = () => {

    const {user} = useSelector((state)=>state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = ()=>{
        dispatch(logout())
        navigate('/login')
        dispatch(reset())
    }

  return (
    <header className='p-3 lg:px-10 ' >
        <nav className='flex items-center justify-between border-b-2 border-gray-600 pb-4' >
            <Link to={'/'}><h1 className="text-3xl font-semibold">GoalSetter</h1></Link>
            <div className="flex items-center gap-x-4">
                {
                !user?(
                <>
                    <Link to={'/login'}><h1 ><FaSignInAlt className='inline-block mx-2' /> Login</h1></Link>
                    <Link to={'/register'}><h1 > <FaUser className='inline-block mx-2' /> Register</h1></Link>
                </>):(
                     <button onClick={handleLogout} ><FaSignOutAlt className='inline-block mx-2' /> Logout</button>
                )
            }
                
                
            </div>
        </nav>
    </header>
  )
}

export default Header