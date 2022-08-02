import React,{useEffect}from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { getGoals,deleteGoals, reset } from '../features/goals/goalsSlice'
import { Navigate ,useNavigate} from 'react-router-dom'
import GoalForm from '../components/GoalForm'
import Spinner from '../components/Spinner'

const Dashboard = () => {

  const {user} = useSelector(state=>state.auth)
  const {goals,isLoading,isError,isSuccess,message} = useSelector(state=>state.goals)
  const dispatch  = useDispatch()
  const navigate = useNavigate()

  useEffect(()=>{
    if(!user)navigate('/login')
  },[user])

  useEffect(()=>{

    
    if(user){
      dispatch(getGoals())
    }

    if(isError){
      console.log({message})
    }

    return ()=>{
      dispatch(reset())
    }

  },[isError])

  const handleDelete = (goal)=>{
      dispatch(deleteGoals(goal))
  }

  if(!user)return <Navigate to='/login' />


  return (
    <main className='flex flex-col items-center h-full'>
      <section className='mt-8 w-full text-center flex flex-col gap-y-6'>
        <h1 className="text-4xl font-bold">Welcome {user?.name} !</h1>
        <h1 className="text-3xl font-semibold text-gray-500">Set Your New Goals!!</h1>
        <GoalForm />
      </section>
      <section className='mt-8 text-center'> 
        <h1 className="text-3xl font-semibold text-gray-500 ">Your Goals</h1>
        {!isLoading?(<div className="grid grid-col-2 md:grid-cols-3 gap-8 mt-10">
          {goals.map(goal=>(
              <div key={goal._id} className='p-6 rounded-lg border-2 border-gray-400 text-center flex flex-col gap-y-4 relative' >
                  <button  onClick={()=>handleDelete(goal)} className="text-lg font-semibold absolute top-0 right-3">x</button>  
                  <h1 className="text-xl font-semibold">{goal.text}</h1>
                  <h1 className="text-xs text-gray-500">{new Date(goal.createdAt).toLocaleString()}</h1>
              </div>
            ))}
        </div>):<Spinner/>}
          
      </section>
    </main>
  )
}

export default Dashboard