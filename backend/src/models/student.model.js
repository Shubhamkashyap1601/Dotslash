import mongoose from "mongoose";
import bcrypt from "bcrypt"

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
    collegeRollNo :{
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
        type : String
    }
},{timestamps : true})

studentSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

studentSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

export const Student = mongoose.model("Student",studentSchema)
