const User = require('../model/userModel')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')


const protect = asyncHandler(async(req,res,next)=>{

    let token
    
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try{
            token = req.headers.authorization.split(' ')[1]

            const {id} = jwt.verify(token,process.env.JWT_SECRET)
            req.user = await User.findById(id).select('-password')

            next()

        }catch(err){
            console.log(err)
            res.status(401)
            throw new Error('Not Authorized')
        }
    }

    if(!token){
        res.status(401)
        throw new Error('No Token & Not Authorized')
    }
})

module.exports = protect