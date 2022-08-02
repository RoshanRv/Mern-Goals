import axios from "axios"

const API_URL = 'https://goal-setter--mern.herokuapp.com/api/goals/'

//      post goals
const postGoals = async(goal,token)=>{
    const config = {
        headers:{
            Authorization: `Bearer ${token}`
        }
    }

    const resp = await axios.post(API_URL,goal,config)

    return resp.data
}

//      get goals
const getGoals = async(token)=>{
    const config = {
        headers:{
            Authorization: `Bearer ${token}`
        }
    }

    const resp = await axios.get(API_URL,config)

    return resp.data
}

//     delete goals
const deleteGoals = async(id,token)=>{
    const config = {
        headers:{
            Authorization: `Bearer ${token}`
        }
    }

    const resp = await axios.delete(API_URL+id,config)
    return resp.data
}

const goalsService={
    postGoals,
    getGoals,
    deleteGoals
}


export default goalsService