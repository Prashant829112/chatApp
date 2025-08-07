import mongoose from "mongoose";

const conversationSchema=new mongoose.Schema({
    participants:[                                      // maintaining an array means in one conversation, there can be multiple participants
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        },
    ],
    messages:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Message"
        }
    ]
},{timestamps:true})

export default mongoose.model('Conversation',conversationSchema)