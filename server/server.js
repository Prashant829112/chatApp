import dotenv from 'dotenv'     // this should be at the top
dotenv.config()
import {app,server} from './socket/socket.js'
import express from 'express'
import { connectDB } from './db/connection1.db.js'
connectDB()
import cookieParser from 'cookie-parser'
import cors from 'cors'


// const app=express()

// CORS handles cross-site data transfer
app.use(cors({
    origin:[process.env.CLIENT_URL],       // only data from sites in origin array is fetchable
    credentials:true                        // if cookies, auth headers, tokens need to be transferred, credentials:true & in axiosInstance.post('URL',{withCredentials:true})
}))
app.use(express.json())
app.use(cookieParser())

const PORT=process.env.PORT
console.log(PORT)

import userRoute from './routes/user.route.js'
app.use('/api/v1/user',userRoute)
// here /api/v1/user are middlewares

import messageRoute from './routes/message.route.js'
app.use('/api/v1/message',messageRoute)

import { errorMiddleware} from './middlewares/error.middleware.js'
app.use(errorMiddleware)

server.listen(PORT,()=>{
    console.log(`server listening at port ${PORT}`)
})