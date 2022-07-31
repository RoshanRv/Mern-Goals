import axios from 'axios'

const API_URL = '/api/users/'

//      register

const register = async(user)=>{

    const resp = await axios.post(API_URL,user)

    if(resp.data){
        localStorage.setItem('user',JSON.stringify(resp.data))
    }

    return resp.data
}

// login

const login = async(user)=>{
    const resp = await axios.post(API_URL+'login',user)

    if(resp.data){
        localStorage.setItem('user',JSON.stringify(resp.data))
    }

    return resp.data

}

//  logout

const logout = ()=>{
    localStorage.removeItem('user')
}

const authService = {
    register,
    logout,
    login
}

export default authService