import React from 'react'
import { Link } from 'react-router-dom'
import {FaUser,FaSignInAlt} from 'react-icons/fa'

const Header = () => {
  return (
    <header className='p-3 lg:px-10 ' >
        <nav className='flex items-center justify-between border-b-2 border-gray-600 pb-4' >
            <Link to={'/'}><h1 className="text-3xl font-semibold">GoalSetter</h1></Link>
            <div className="flex items-center gap-x-4">
                <Link to={'/login'}><a ><FaSignInAlt className='inline-block mx-2' /> Login</a></Link>
                <Link to={'/register'}><a > <FaUser className='inline-block mx-2' /> Register</a></Link>
                
            </div>
        </nav>
    </header>
  )
}

export default Header