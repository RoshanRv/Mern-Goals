import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import goalsService from "./goalsService";

const initialState = {
    goals : [],
    isError:false,
    isLoading:false,
    isSuccess:false,
    message:''
}

// post goals
export const postGoals = createAsyncThunk('goals/postGoals',async(goal,thunkApi)=>{
    try{

        const token = thunkApi.getState().auth.user.token

        return await goalsService.postGoals(goal,token)
    }catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkApi.rejectWithValue(message)
    }
})

// get goals
export const getGoals = createAsyncThunk('goals/getGoals',async(_,thunkApi)=>{
    try{

        const token = thunkApi.getState().auth.user.token
        return await goalsService.getGoals(token)
    }catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkApi.rejectWithValue(message)
    }
})

// delete goals
export const deleteGoals = createAsyncThunk('goals/deleteGoals',async(goal,thunkApi)=>{
    try{

        const token = thunkApi.getState().auth.user.token
        return await goalsService.deleteGoals(goal._id,token)
    }catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkApi.rejectWithValue(message)
    }
})

const goalsSlice = createSlice({
    name:'goals',
    initialState,
    reducers:{
        reset:(state)=> initialState
    },
    extraReducers:(builder)=>{
        builder
        //  post goals
            .addCase(postGoals.pending,(state)=>{
                state.isLoading = true
            })
            .addCase(postGoals.fulfilled,(state,action)=>{
                state.isLoading = false
                state.isSuccess = true
                state.isError = false
                state.goals.push(action.payload)
                state.message = 'Goal Posted'
            })
            .addCase(postGoals.rejected,(state,action)=>{
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload
            })

        //  get goals
        .addCase(getGoals.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getGoals.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.isError = false
            state.goals = (action.payload)
        })
        .addCase(getGoals.rejected,(state,action)=>{
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.payload
        })

        //  delete goals
        .addCase(deleteGoals.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(deleteGoals.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.isError = false
            state.goals = state.goals.filter(goal=>goal._id != action.payload._id)
        })
        .addCase(deleteGoals.rejected,(state,action)=>{
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.payload
        })
    }
})

export const {reset} = goalsSlice.actions
export default goalsSlice.reducer