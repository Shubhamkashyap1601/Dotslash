import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/apiError.js"
import { ApiResponse } from "../utils/apiResponse.js"
import { Student } from "../models/student.model.js"
import { destroyOnCloudinary, uploadOnCloudinary } from "../utils/cloudinary.js"
import jwt from "jsonwebtoken"

const generateAccessAndRefreshTokens = async(userId) => {
    try {
        const user = await Student.findById(userId)
        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();

        user.refreshToken = refreshToken;
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

    const {name, email, username, password, rollNo} = req.body;
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
    else if(rollNo?.trim() === ""){
        throw new ApiError(400,"college roll number is required");
    }

    const existedStudent = await Student.findOne({
        $or: [{username},{email}]
    })
    if(existedStudent){
        throw new ApiError(409,"Student with email or username already exists")
    }
    let pfpPath;
    if(req.file && req.file.path){
        pfpPath = req.file.path;
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
            rollNo,
            pfp: pfp?.url || ""
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
    if(!isPasswordValid){
        throw new ApiError(400,"Wrong passowrd");
    }
    const {accessToken,refreshToken} = await generateAccessAndRefreshTokens(user._id)


    const loggedInUser = await Student.findById(user._id).select("-password -refreshToken");
    res.status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new ApiResponse(
            200,
            {
                user : loggedInUser
                ,accessToken,refreshToken
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

const isAuth = asyncHandler(async(req,res)=>{
    return res.status(200)
            .json(
                new ApiResponse(
                    200,
                    req.user.username,
                    "User is logged in"
                )
            )
})
const getCurrentUser = asyncHandler(async(req,res) =>{
        
    return res.status(200)
        .json(new ApiResponse(
            200,
            req.user,
            "Fetched user data successfully"
        )) 
})
const getUser = asyncHandler(async(req,res)=>{
    const username = req.params.username;
    let user;
    try {
        user = await Student.findOne({username : username}).select("-password -refreshToken");
    } catch (error) {
        throw new ApiError("Error occured while fetching the user")
    }
    return res.status(200)
        .json(
            new ApiResponse(
                200,
                user,
                "Found user successfully"
            )
        )

})
const changePassword = asyncHandler(async(req,res)=>{
    const {oldPassword,newPassword} = req.body
    const user = await Student.findById(req.user._id)
    const isCorrect = user.isPasswordCorrect(oldPassword);
    if(!isCorrect) {
        throw new ApiError(400,"Wrong old password");
    }
    user.password = newPassword;
    try {
        user.save({validateBeforeSave:false});
    } catch (error) {
        throw new ApiError(400,"Error occured while saving password to the database")
    }
    return res.status(200)
        .json(
            new ApiResponse(
                200,
                {},
                "Password Changes successfully"
            )
        )
})

const updateUserPfp = asyncHandler(async(req,res)=>{
    if(!(req.file?.path)){
        throw new ApiError(400,"Please provide pfp to be updated");
    }
    const user = Student.findById(req.user._id);
    try {
        await destroyOnCloudinary(user.pfp)
    } catch (error) {
        throw new ApiError(400,"Error deleting old pfp from cloudinary")
    }
    const newPfp = await uploadOnCloudinary(req.file.path)
    user.pfp = newPfp.url;
    try {
        user.save({validateBeforeSave:false});
    } catch (error) {
        throw new ApiError(400,"Error while saving into database")
    }
    return res.status(200)
        .json(
            new ApiResponse(
                200,
                {},
                "pfp updated successfully"
            )
        )
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
export {registerStudent,loginStudent,deleteStudent,logoutStudent,refreshAccessToken,getCurrentUser,getUser,changePassword,updateUserPfp,isAuth} 