import { Chat } from "../models/chat.model.js";
import { Student } from "../models/student.model.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const accessChat = asyncHandler( async(req,res) => {
    const {userId} = req.body;
    if(!userId){
        return res.sendStatus(400)
    }
    const user2 = await Student.findOne({_id: userId})
    let isChat = await Chat.find({
        isGroupChat: false,
        $and: [
            {users: {$elemMatch: { $eq: req.user._id }}},
            {users: {$elemMatch: { $eq: userId }}},
        ],
    }).populate("users", "name email pfp").populate("latestMessage")

    isChat = await Student.populate(isChat, {
        path: "latestMessage.sender",
        select: "name email pfp"
    })

    if(isChat.length > 0){
        res.send(isChat[0])
    }
    else{
        let chatData = {
            name: user2.name,
            isGroupChat: true,
            users: [req.user._id, userId],
        };

        try{
            const createdChat = await Chat.create(chatData)
            const fullChat = await Chat.findOne({_id: createdChat._id})
            .populate("users", "name email pfp")

            res.status(200).send(fullChat)
        }
        catch(err){
            throw new ApiError(400, `${err.message}`)
        }
    }
})

const fetchChats = asyncHandler( async(req, res) => {   
    try{
        Chat.find({
            name: {$ne: req.user.name},
            users: {$elemMatch: {$eq: req.user._id}}
        })
        .populate("users", "name email pfp")
        .populate("groupAdmin", "name email pfp")
        .populate("latestMessage")
        .sort({updatedAt: -1})
        .then(async (results) => {
            results = await Student.populate(results, {
                path: "latestMessage.sender",
                select: "name email pfp"
            })
        
            res.status(200).send(results)
        })
    }
    catch (err){
        res.status(400) 
        throw new Error(err.message)  
    }
})

const createGroupChat = asyncHandler( async(req, res) => {
    if( !req.body.users || !req.body.name) {
        return res.status(400).send({message: "Please fill all the fields"})
    }

    let users = JSON.parse(req.body.users)
    if(users.length < 2){
        return res
        .send(400)
        .send("More than 2 users are necessary for a group")
    }
    users.push(req.user)

    try{
        const groupChat = await Chat.create({
            name: req.body.name,
            users: users,
            isGroupChat: true,
            groupAdmin: req.user,
        })

        const fullGroupChat = await Chat.findOne({_id: groupChat._id})
        .populate("users", "name email pfp")
        .populate("groupAdmin", "name email pfp")

        res.status(200).send(fullGroupChat)
    }
    catch (err){
        res.send(400);
        throw new Error(err.message)
    }
})

const renameGroup = asyncHandler( async(req, res) => {
    const {groupId, newName} = req.body;
    if(!groupId || !newName)
    {
        return res.status(400).send("Group Id and New group name cannot be empty")
    }
    const group = await Chat.findByIdAndUpdate(
        groupId,
        {
            name: newName
        },
        {
            new: true
        }
    )
    .populate("users", "name email pfp")
    .populate("groupAdmin", "name email pfp")
    if(!group)
    {
        res.status(404)
        throw new Error("Group not found")
    }
    else res.status(200).send(group)
})

const addToGroup = asyncHandler( async(req, res) => {
    const {groupId, userId} = req.body
    if(!groupId || !userId)
    {
        res.status(401).send("GroudId and UserId can't be empty")
    }
    const group = await Chat.findByIdAndUpdate(
        groupId,
        {
            $push: {users: userId},
        },
        {
            new: true,
        }
    ).populate("users", "name email pfp")
     .populate("groupAdmin", "name email pfp")

    if(!group)
    {
        res.status(400)
        throw new Error("Group not found")
    }
    else res.status(200).send(group)
})

const removeFromGroup = asyncHandler( async(req, res) => {
    const {groupId, userId} = req.body
    if(!groupId || !userId)
    {
        res.status(401).send("GroudId and UserId can't be empty")
    }
    const group = await Chat.findByIdAndUpdate(
        groupId,
        {
            $pull: {users: userId},
        },
        {
            new: true,
        }
    ).populate("users", "name email pfp")
     .populate("groupAdmin", "name email pfp")

    if(!group)
    {
        res.status(400)
        throw new Error("Group not found")
    }
    else res.status(200).send(group)
})

export {
    accessChat,
    fetchChats,
    createGroupChat,
    renameGroup,
    addToGroup,
    removeFromGroup,
};