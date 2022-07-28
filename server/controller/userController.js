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
    if(userExist){
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
            email,
            token:generateToken(user._id)
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
            email:user.email,
            token:generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid Credential')
    }
})


// @desc get user based on token
// @route GET /api/users/me

const getMe = asyncHandler(async(req,res)=>{
    res.status(200).json(req.user)
})


//  Create Token
const generateToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:'1d',
    })
}

module.exports = {
    registerUser,
    loginUser,
    getMe
}