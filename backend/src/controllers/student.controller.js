import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/apiError.js"
import { ApiResponse } from "../utils/apiResponse.js"
import { Student } from "../models/student.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"

const registerStudent = asyncHandler(async(req,res) =>{

    const {name, email, username, password, collegeRollNo} = req.body;

    if(name?.trim() === ""){
        throw new ApiError(400,"Name is required");
    }
    else if(email?.trim() === ""){
        throw new ApiError(400,"email is required");
    }
    else if(username?.trim() === ""){
        throw new ApiError(400,"username is required");
    }
    else if(password?.trim() === ""){
        throw new ApiError(400,"password is required");
    }
    else if(collegeRollNo?.trim() === ""){
        throw new ApiError(400,"college roll number is required");
    }

    const existedStudent = await Student.findOne({
        $or: [{username},{email}]
    })
    if(existedStudent){
        throw new ApiError(409,"Student with email or username already exists")
    }
    let pfpPath;
    if(req.files && Array.isArray(req.files.pfp) && req.files.pfp.length > 0){
        pfpPath = req.files.pfp[0].path
    }
    let pfp;
    if(pfpPath){
        pfp = await uploadOnCloudinary(pfpPath);
    }   

    try{
        const student = await Student.create({
            name,
            email,
            password,
            username: username.toLowerCase(),
            collegeRollNo,
            pfp: pfp?.url
        }).then(student => res.status(200).json({
            message : "User successfully created",
            student,
        }))
    }
    catch(err)
    {
        throw new ApiError(500,`Something went wrong while registring the student ${err.message}`)
    }
})

const studentLogin = asyncHandler(async(req,res) => {
    const {username, email, password} = req.body;
    if(!username && !email){
        throw new ApiError(400,"username or email required")
    }
    const user = await Student.findOne({
        $or : [{username},{email}]
    })
    if(!user){
        throw new ApiError(400,"wrong username")
    }
    const isPasswordValid = user.isPasswordCorrect(password);
    if(!isPasswordValid){
        throw new ApiError(400,"Wrong passowrd");
    }
    else{
        res.status(200).json({
            message : "Login Successful",
            user,
        })
    }
})

const deleteStudent = asyncHandler(async(req,res)=>{
    const {id} = req.body
    await Student.findById(id)
    .then(user => user.remove())
    .then(user =>
      res.status(201).json({ message: "User successfully deleted", user })
    )
    .catch(error =>
      res
        .status(400)
        .json({ message: "An error occurred", error: error.message })
    )
})
export {registerStudent,studentLogin,deleteStudent} 