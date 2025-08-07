import {asyncHandler} from '../utilities/asyncHandler.utility.js'
import {errorHandler} from '../utilities/errorHandler.utility.js'
import Conversation from '../models/conversation.model.js'
import Message from '../models/message.model.js'
import { getSocketId, io } from '../socket/socket.js'

export const sendMessage=asyncHandler(async (req,res,next)=>{
    const senderId=req.user._id
    const receiverId=req.params.receiverId      // receiverId will be received from url as params
    const message=req.body.message
    console.log(senderId)
    console.log(receiverId)
    console.log(message)
    if(!senderId || !receiverId || !message){
        return next(new errorHandler("All fields are required",400))
    }
    let conversation=await Conversation.findOne({
        participants:{$all:[senderId,receiverId]}       
    })
    // {$all:[senderId,receiverId]} will find a Conversation in conversations connection in mongoDb where participants array has senderId,receiverId in any order -> $all allows any order -> if $all is not used, strictly [senderId,receiverId] this ordering will be found  
    // findOne() will store js object in conversation in the same format as written in Conversation model -> {participants:[],message:[],timestamps}
    if(!conversation){
        conversation=await Conversation.create({
            participants:[senderId,receiverId]
        })
    }
    const newMessage=await Message.create({
        senderId,
        receiverId,
        message
    })
    if(newMessage){
        conversation.messages.push(newMessage._id)
        await conversation.save()
    }
    
    // socket.io
    const socketId=getSocketId(receiverId)
    io.to(socketId).emit('newMessage',newMessage)

    res.status(200).json({
        success:true,
        responseData:newMessage
    })
})

export const getMessages=asyncHandler(async (req,res,next)=>{
    const myId=req.user._id
    const otherParticipantId=req.params.otherParticipantId
    if(!myId || !otherParticipantId){
        return next(new errorHandler("All fields are required",400))
    }
    let conversation=await Conversation.findOne({
        participants:{$all:[myId,otherParticipantId]}
    }).populate("messages")
    // without populate(), conversation will store js object in the way it has been written in Conversation model
    // after populate("message"), "message" key which was only storing Message._id will now store whole info present in Message model whose document has _id
    res.status(200).json({
        success:true,
        responseData:conversation
    })
})