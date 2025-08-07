import { createSlice } from '@reduxjs/toolkit'
import io from 'socket.io-client'

const initialState={
    socket:null,
    onlineUsers:null
}

export const socketSlice=createSlice({
    name:'socket',
    initialState,
    reducers:{
        initializeSocket:(state,action)=>{
            const socket=io(import.meta.env.VITE_DB_ORIGIN,{
                query:{
                    userId:action.payload
                }
                // this is a method to send some parameter to server upon connection -> query & userId are var used as keys
                // userDetails._id has been set in userId which will be retreived in server 
            })
            // console.log(socket)            
            state.socket=socket          
        },
        setOnlineUsers:(state,action)=>{
            state.onlineUsers=action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const {initializeSocket,setOnlineUsers}=socketSlice.actions

export default socketSlice.reducer