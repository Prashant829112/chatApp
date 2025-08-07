import { createAsyncThunk } from "@reduxjs/toolkit"
import { axiosInstance } from "../components/utilities/axiosInstance"
import {toast} from 'react-hot-toast'

export const loginUserThunk = createAsyncThunk('users/loginUserThunk',async ({username,password},{rejectWithValue}) => {
    // 'users/action_name' creates the 3 cases handled in user.slice & 'users' is just a writing convention to be written in createAsyncThunk
    // console.log("Hello")
    try {
      const response=await axiosInstance.post('/user/login',{
        userName:username,                                    // userName used in backend & username used in frontend -> this creates confusion
        password
      })
      // above step posts user's input data({username,password}) on server's body({userName,password}) which was being posted through thunder client   
      console.log(response)
      toast.success("Login successful")
    return response.data                                      // stores response.data in action.payload of fulifilled case in user.slice.js
    } catch (error) {
      console.error(error)                                    // gives details in error format on browser's console
      const errorOutput=error?.response?.data?.errMessage     // stores the response -> go to console after creating an error while login -> errMessage will be found
      toast.error(errorOutput)
      return rejectWithValue(errorOutput)                     // errorOutput will be stored in action.payload of rejected case
    }
  }
)
// here action name is loginUserThunk which is to be called inside dispatch()

export const registerUserThunk = createAsyncThunk('users/registerUserThunk',async ({fullname,username,password,gender},{rejectWithValue}) => {
    try {
      const response=await axiosInstance.post('/user/register',{
        fullName:fullname,
        userName:username,  
        password,
        password,
        gender
      })
      console.log(response)
      toast.success("Account created successfully")
      return response.data
    } catch (error) {
      console.error(error)                                    
      const errorOutput=error?.response?.data?.errMessage     
      toast.error(errorOutput)
      return rejectWithValue(errorOutput)
    }
  }
)

export const logoutThunk = createAsyncThunk('users/logoutThunk',async (_,{rejectWithValue}) => {
    try {
      const response=await axiosInstance.post('/user/logout')
      toast.success("Logout successful")
      return response.data
    } catch (error) {
      console.error(error)                                    
      const errorOutput=error?.response?.data?.errMessage     
      toast.error(errorOutput)
      return rejectWithValue(errorOutput)
    }
  }
)

export const getProfileThunk = createAsyncThunk('users/getProfileThunk',async (_,{rejectWithValue}) => {
    try {
      const response=await axiosInstance.get('/user/get-profile')
      return response.data
    } catch (error) {
      console.error(error)        
      const errorOutput=error?.response?.data?.errMessage     
      return rejectWithValue(errorOutput)
    }
  }
)

export const getOtherUsersThunk = createAsyncThunk('users/getOtherUsersThunk',async (_,{rejectWithValue}) => {
    try {
      const response=await axiosInstance.get('/user/get-other-users')
      return response.data
    } catch (error) {
      console.error(error)        
      const errorOutput=error?.response?.data?.errMessage     
      return rejectWithValue(errorOutput)
    }
  }
)
