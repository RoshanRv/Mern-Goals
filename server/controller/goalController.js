const asyncHandler = require('express-async-handler')

// @desc Get Goals
// @route GET /api/goals

const getGoals = asyncHandler(async(req,res)=>{
    res.status(200).json({msg:"GET goals"})
})

// @desc Set Goals
// @route POST /api/goals

const setGoals = asyncHandler(async(req,res)=>{
    
    if(!req.body.text){
        res.status(400)
        throw new Error('Enter Text')
    }

    res.status(201).json({msg:"SET goals"})
})

// @desc Update Goals
// @route PUT /api/goals

const updateGoals = asyncHandler(async(req,res)=>{
    res.status(200).json({msg:`UPDATE goal ${req.params.id} `})
})

// @desc Delete Goals
// @route DELETE /api/goals

const deleteGoals = asyncHandler(async(req,res)=>{
    res.status(200).json({msg:`DELETE goal ${req.params.id} `})
})

module.exports ={
    getGoals,
    setGoals,
    updateGoals,
    deleteGoals
}