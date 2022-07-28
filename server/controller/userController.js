const User = require('../model/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

// @desc Create Users
// @ routes POST /api/users
const registerUser = asyncHandler(async(req,res)=>{
    const {name,email,password} = req.body

    if(!name || !email || !password){
        res.status(400)
        throw new Error('Fill All The Fields')
    }

    const userExist = await User.findOne({email})
    console.log(userExist)
    if(userExist.length>0){
        res.status(400)
        throw new Error('User Already Exist')
    }

    const hashedpw = await bcrypt.hash(password,10)
    const user = await User.create({
        name,
        email,
        password:hashedpw
    })

    if(user){
        res.status(201).json({
            id:user._id,
            name,
            email  
        })
    }else{
        res.status(400)
        throw new Error('Invalid Details')
    }
    
})

// @desc login user
// @route POST /api/users/login

const loginUser = asyncHandler(async(req,res)=>{
    const {email,password} = req.body
    const user = await User.findOne({email})
    if(user && await bcrypt.compare(password,user.password)){
        res.status(200).json({
            _id:user._id,
            name:user.name,
            email:user.email
        })
    }else{
        res.status(400)
        throw new Error('Invalid Credential')
    }
})

module.exports = {
    registerUser,
    loginUser
}