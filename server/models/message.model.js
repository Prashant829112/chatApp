import mongoose from "mongoose";

const messageSchema=new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,            // this is a mongoDB id created by mongoDB to uniquely identify User
        ref:'User',         // referencing, developing relationship like foreign key
        required:true
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    message:{
        type:String,
        required:true
    }
},{timestamps:true})

export default mongoose.model('Message',messageSchema)