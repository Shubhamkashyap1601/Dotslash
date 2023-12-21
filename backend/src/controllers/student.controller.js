import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/apiError.js"
import { ApiResponse } from "../utils/apiResponse.js"
import { Student } from "../models/student.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import jwt from "jsonwebtoken"

const generateAccessAndRefreshTokens = async(userId) => {
    try {
        const user = await Student.findById(userId)
        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();
        
        if(user) user.refreshToken = refreshToken;
        await user.save({validationBeforeSave : false})
        return {accessToken,refreshToken}
    } catch (error) {
        throw new ApiError(500,error?.message || "Something went wrong while generating refresh and access tokens");  
    }
    
}

const options ={
    httpOnly : true,
    secure : true
}

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
        })
        const createdStudent = await Student.findById(student._id).select("-password -refreshToken")
        return res.status(201).json(
            new ApiResponse(200,createdStudent,"Student registered successfulluy")
        )
    }
    catch(err)
    {
        throw new ApiError(500,`Something went wrong while registring the student ${err.message}`)
    }
})

const loginStudent = asyncHandler(async(req,res) => {
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
    const isPasswordValid = await user.isPasswordCorrect(password);
    console.log(isPasswordValid)
    if(!isPasswordValid){
        throw new ApiError(400,"Wrong passowrd");
    }
    const {accessToken,refreshToken} = await generateAccessAndRefreshTokens(user._id)
   
    // console.log(accessToken);
    // console.log(refreshToken);

    const loggedInUser = await Student.findById(user._id).select("-password -refreshToken");
    res.status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new ApiResponse(
            200,
            {
                user : loggedInUser,accessToken,refreshToken
            },
            "User logged in Successfully"
        )
    )
})

const logoutStudent= asyncHandler(async(req,res) =>{
    await Student.findByIdAndUpdate(
        req.user._id,
        {
            $set :{
                refreshToken: undefined
            }
        },
        {
            new: true
        }
    )

    return res.status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(new ApiResponse(200,{},"User logged out successfully"))
})

const refreshAccessToken = asyncHandler(async(req,res) =>{
    const incomingRefreshToken = req.cookies?.refreshToken || req.body?.refreshToken
    
    if(!incomingRefreshToken){
        throw new ApiError(400,"refreshToken not found")
    }
    try {
        const decodedToken = jwt.verify(incomingRefreshToken,process.env.REFRESH_TOKEN_SECRET)
        console.log(decodedToken)
        const user = await Student.findById(decodedToken?._id)
        console.log(user.refreshToken);
        if(!user){
            throw new ApiError(401,"Invalid Refresh Token")
        }
        if(incomingRefreshToken !== user?.refreshToken){
            throw new ApiError(401,"Refresh token is expired or used");
        }

        const {accessToken,refreshToken} = await generateAccessAndRefreshTokens(user._id);
        return res.status(200)
        .cookie("accessToken",accessToken,options)
        .cookie("refreshToken",incomingRefreshToken,options)
        .json(
            new ApiResponse(
                200,
                {accessToken,refreshToken},
                "access Token refreshed successfully"
            )
        )
    } catch (error) {
        throw new ApiError(401,error?.message || "invalid refresh token")
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
export {registerStudent,loginStudent,deleteStudent,logoutStudent,refreshAccessToken} 