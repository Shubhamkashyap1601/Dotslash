import mongoose, { Mongoose, mongo } from "mongoose";   

const chatSchema = new mongoose.Schema(
{
    name: {
        type: String,
        required: true,
        trim: true,
    },
    isGroup: {
        type: Boolean,
        default: false,
    },
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student"
        }
    ],
    latestMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
    },
    groupAdmin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
    },
}, 
{ timestamps: true });

export const Chat = mongoose.model("Chat", chatSchema)