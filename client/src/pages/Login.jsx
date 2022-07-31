import React ,{useState,useEffect}from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import {useSelector , useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {login,reset} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'


const Login = () => {

  const [formData,setFormData]=useState({
    email:'',
    password:''
  })
  const {email,password} = formData

  const {user,isLoading,isError,message,isSuccess} = useSelector((state)=>state.auth)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(()=>{

    if(isError){
      toast.error(message)
    }

    if(user){
      navigate('/')
    }

    dispatch(reset())

  },[user,isLoading,isError,message])

  const handleChange = (e)=>{
    setFormData(pre=>({
      ...pre,[e.target.name]:e.target.value
    }))
  }

  const handleSubmit = (e)=>{
    if( email !='' || password !='' ){
      e.preventDefault()

      const userData = {email,password}

      dispatch(login(userData))
    }
  }

  return (
    <main className='h-full flex flex-col justify-center items-center gap-6'>
      <h1 className="text-4xl  font-bold"><FaSignInAlt className='inline-block mx-2' />  Login</h1>
      <h1 className="text-gray-600 text-2xl font-semibold ">Login In Into Existing Account</h1>
      {/* form */}
      <div className="lg:p-10 p-3 rounded-md shadow-md w-11/12 mx-auto md:w-8/12 lg:w-6/12 bg-gray-300">
        <form action="" className='flex flex-col gap-y-8' onSubmit={handleSubmit} >  
          <input type="email" name="email" required value={email} onChange={handleChange} placeholder='Email' className='block w-full p-2 outline-0 border-2 border-black/60 rounded-sm' />
          <input type="password" name="password" required value={password} onChange={handleChange} placeholder='Password' className='block w-full p-2 outline-0 border-2 border-black/60 rounded-sm' />
          <input type="submit" value="Login" className='w-full bg-black text-white py-2 rounded-lg cursor-pointer' />
        </form>
      </div>
    </main>
  )
}

export default Login