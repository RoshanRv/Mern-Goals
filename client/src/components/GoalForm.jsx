import React,{useEffect, useState}from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { postGoals, reset } from '../features/goals/goalsSlice'
import { toast } from 'react-toastify'

const GoalForm = () => {

    const {goals,isLoading,isError,isSuccess,message} = useSelector(state=>state.goals)
    const dispatch = useDispatch()
    const [text,setText]=useState('')

    useEffect(()=>{
        if(isError)toast.error(message)


    },[isError,isSuccess,goals])

    const handleSubmit = (e)=>{
        if(text!==''){
            e.preventDefault()
            dispatch(postGoals({text}))
            setText('')
        }
    }

  return (
    <form className='rounded-lg p-4 border-2 border-gray-400 w-11/12 md:w-8/12 lg:w-6/12 mx-auto my-8 flex flex-col gap-y-6' onSubmit={handleSubmit}>
        <input type="text" value={text} onChange={(e)=>setText(e.target.value)} placeholder='Set Goal' className='p-2 w-full block border-b-2 border-black/70 outline-0' />
        <input type="submit" className='p-2 rounded-md w-full block bg-black text-white cursor-pointer' value={'Add Goal'} />
    </form>
  )
}

export default GoalForm