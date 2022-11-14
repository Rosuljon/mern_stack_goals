import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import goalService from "./goalsService";
const initialState = {
  goals: [],
  isError: false,
  isSeccess: false,
  isLoadiing: false,
  message: "",
};

//create a new goal
export const createGoal = createAsyncThunk(
    'goals/create',
    async (goalData, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token
        return await goalService.createGoal(goalData, token)
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        return thunkAPI.rejectWithValue(message)
      }
    }
  )
//get user goals  
export const getGoals = createAsyncThunk('goals/getAll',async (_,thunkAPI) =>{
    try {
        const token = thunkAPI.getState().auth.user.token
        return await goalService.getGoals(token)
    } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        return thunkAPI.rejectWithValue(message)
    }
});

//delete a goal
export const deleteGoal = createAsyncThunk(
    'goals/delete',
    async (id, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token
        return await goalService.deleteGoal(id, token)
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        return thunkAPI.rejectWithValue(message)
      }
    }
  )

export const goalsSlice = createSlice({
  name: "goal",
  initialState,
  reducers: {
    reset: (state) => state.initialState,
  },
  extraReducers: (builder)=>{
    builder
        .addCase(createGoal.pending, state =>{
            state.isLoadiing = true;
        })
        .addCase(createGoal.fulfilled, (state,action)=>{
            state.isLoadiing = false
            state.isSeccess = true
            state.goals.push(action.payload)
        })
        .addCase(createGoal.rejected, (state,action)=>{
            state.isLoadiing = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(getGoals.pending, state =>{
            state.isLoadiing = true;
        })
        .addCase(getGoals.fulfilled, (state,action)=>{
            state.isLoadiing = false
            state.isSeccess = true
            state.goals = action.payload
        })
        .addCase(getGoals.rejected, (state,action)=>{
            state.isLoadiing = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(deleteGoal.pending, state =>{
            state.isLoadiing = true;
        })
        .addCase(deleteGoal.fulfilled, (state,action)=>{
            state.isLoadiing = false
            state.isSeccess = true
            state.goals = state.goals.filter(goal => goal._id !== action.payload.id)
        })
        .addCase(deleteGoal.rejected, (state,action)=>{
            state.isLoadiing = false
            state.isError = true
            state.message = action.payload
        })
  }
});

export const { reset } = goalsSlice.actions;
export default goalsSlice.reducer;
