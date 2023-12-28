import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const studentSchema = new mongoose.Schema({
    username :{
        type : String,
        unique : true,
        required : true,
    },
    password : {
        type : String,
        minlength : 6,
        required : true,
    },
    name :{
        type : String,
        required : true
    },
    rollNo :{
        type : String,
        required : true
    },
    email :{
        type : String,
        required : true
    },
    phoneNumber :{
        type : Number,
    },
    leetcode :{
        type : String,
    },
    codeforces :{
        type : String,
    },
    codechef :{
        type : String,
    },
    linkedin :{
        type : String,
    },
    pfp :{
        type : String,
    },
    refreshToken :{
        type : String
    },
    likedBlogs:[{
        type : mongoose.Schema.Types.ObjectId,
    }]  
},{timestamps : true})

studentSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})
studentSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

studentSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id:this._id,
            username:this.username,
            name:this.name,
            email:this.email
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
studentSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id:this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}
export const Student = mongoose.model("Student",studentSchema)
