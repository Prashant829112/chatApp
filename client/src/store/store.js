import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slice/user.slice'
import messageReducer from './slice/message.slice'
import socketReducer from './slice/socket.slice'

export const store = configureStore({
  reducer: {
    userReducer,
    messageReducer,
    socketReducer
  },
  middleware:(getDefaultMiddleware)=>
    getDefaultMiddleware({
      serializableCheck:{
        ignoredPaths:["socketReducer.socket"]
      }
    })
})