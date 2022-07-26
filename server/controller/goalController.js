const asyncHandler = require('express-async-handler')
const Goal = require('../model/goalsModel')
const mongoose = require('mongoose')

// @desc Get Goals
// @route GET /api/goals

const getGoals = asyncHandler(async(req,res)=>{
    const goals = await Goal.find()
    res.status(200).json(goals)
})

// @desc Set Goals
// @route POST /api/goals

const setGoals = asyncHandler(async(req,res)=>{
    
    if(!req.body.text){
        res.status(400)
        throw new Error('Enter Text')
    }

    const goal = await Goal.create(req.body)
    res.status(201).json(goal)
})

// @desc Update Goals
// @route PUT /api/goals

const updateGoals = asyncHandler(async(req,res)=>{
    const {id} = req.params
    const goal = await Goal.findById(id)
    if(!goal){
        res.status(400)
        throw new Error('No Goal Found')
    }
    const updated = await Goal.findByIdAndUpdate(id,req.body,{new:true})
    res.status(200).json(updated)
})

// @desc Delete Goals
// @route DELETE /api/goals

const deleteGoals = asyncHandler(async(req,res)=>{
    const {id} = req.params
    const goal = await Goal.findById(id)
    if(!goal){
        res.status(400)
        throw new Error('No Goal Found')
    }
    const updated = await Goal.findByIdAndDelete(id)
    res.status(200).json(updated)
})

module.exports ={
    getGoals,
    setGoals,
    updateGoals,
    deleteGoals
}