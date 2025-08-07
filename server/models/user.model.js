import mongoose from 'mongoose'

const userSchema =new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
        required:true
    }
},{timestamps:true})        // this timestamps gives data of time of creation, updation, etc

const User=mongoose.model("User",userSchema)       // way of writing "User" should be followed & mongoDB converts it to "users"
export default User