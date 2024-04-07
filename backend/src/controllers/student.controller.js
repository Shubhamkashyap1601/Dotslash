import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/apiError.js"
import { ApiResponse } from "../utils/apiResponse.js"
import { Student } from "../models/student.model.js"
import { destroyOnCloudinary, uploadOnCloudinary } from "../utils/cloudinary.js"
import jwt from "jsonwebtoken"
import * as cheerio from 'cheerio';
import { set } from "mongoose"

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await Student.findById(userId)
        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validationBeforeSave: false })
        return { accessToken, refreshToken }
    } catch (error) {
        throw new ApiError(500, error?.message || "Something went wrong while generating refresh and access tokens");
    }

}

const options = {
    httpOnly: true,
    secure: true
}

const registerStudent = asyncHandler(async (req, res) => {

    const { name, email, username, password, rollNo } = req.body;
    if (name?.trim() === "") {
        throw new ApiError(400, "Name is required");
    }
    else if (email?.trim() === "") {
        throw new ApiError(400, "email is required");
    }
    else if (username?.trim() === "") {
        throw new ApiError(400, "username is required");
    }
    else if (password?.trim() === "") {
        throw new ApiError(400, "password is required");
    }
    else if (rollNo?.trim() === "") {
        throw new ApiError(400, "college roll number is required");
    }

    const existedStudent = await Student.findOne({
        $or: [{ username }, { email }]
    })
    if (existedStudent) {
        throw new ApiError(409, "Student with email or username already exists")
    }
    let pfpPath;
    if (req.file && req.file.path) {
        pfpPath = req.file.path;
    }
    let pfp;
    if (pfpPath) {
        pfp = await uploadOnCloudinary(pfpPath);
    }

    try {
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
            new ApiResponse(200, createdStudent, "Student registered successfulluy")
        )
    }
    catch (err) {
        throw new ApiError(500, `Something went wrong while registring the student ${err.message}`)
    }
})

const loginStudent = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username && !email) {
        throw new ApiError(400, "username or email required")
    }
    const user = await Student.findOne({
        $or: [{ username }, { email }]
    })
    if (!user) {
        throw new ApiError(400, "wrong username")
    }
    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
        throw new ApiError(400, "Wrong passowrd");
    }
    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id)


    const loggedInUser = await Student.findById(user._id).select("-password -refreshToken");
    res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(  
            new ApiResponse(
                200,
                {
                    user: loggedInUser
                    , accessToken, refreshToken
                },
                "User logged in Successfully"
            )
        )
})

const logoutStudent = asyncHandler(async (req, res) => {
    await Student.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            new: true
        }
    )

    return res.status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged out successfully"))
})

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies?.refreshToken || req.body?.refreshToken

    if (!incomingRefreshToken) {
        throw new ApiError(400, "refreshToken not found")
    }
    try {
        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)
        console.log(decodedToken)
        const user = await Student.findById(decodedToken?._id)
        console.log(user.refreshToken);
        if (!user) {
            throw new ApiError(401, "Invalid Refresh Token")
        }
        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used");
        }

        const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);
        return res.status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", incomingRefreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    { accessToken, refreshToken },
                    "access Token refreshed successfully"
                )
            )
    } catch (error) {
        throw new ApiError(401, error?.message || "invalid refresh token")
    }
})

const isAuthorized = asyncHandler(async (req, res) => {
    return res.status(200)
        .json(
            new ApiResponse(
                200,
                req.user.username,
                "User is logged in"
            )
        )
})

const getUser = asyncHandler(async (req, res) => {
    const username = req.params.username;
    let user;
    try {
        user = await Student.findOne({ username: username }).select("-password -refreshToken");
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

const updateRating = asyncHandler(async (req, res) => {
    const username = req.params.username;
    let user;
    try {
        user = await Student.findOne({ username: username }).select("-password -refreshToken");
        if(!user.codingPlatforms.lastupdated ||  (user.codingPlatforms.lastupdated - Date.now() > 1000*60*60*24))
        {
            await scrapeRatingLeetcode(user.codingPlatforms.leetcode);
            await scrapeRatingCodeforces(user.codingPlatforms.codeforces);
            await scrapeRatingCodechef(user.codingPlatforms.codechef);
            user.codingPlatforms.lastupdated = Date.now();  
            await user.save({validateBeforeSave:false});
        }
    } catch (error) {
        throw new ApiError("Error occured while fetching the user")
    }
    return res.status(200)
        .json(
            new ApiResponse(
                200,
                user.codingPlatforms,
                "Found user successfully"
            )
        )
})
const changePassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body
    const user = await Student.findById(req.user._id)
    const isCorrect = user.isPasswordCorrect(oldPassword);
    if (!isCorrect) {
        throw new ApiError(400, "Wrong old password");
    }
    user.password = newPassword;
    try {
        user.save({ validateBeforeSave: false });
    } catch (error) {
        throw new ApiError(400, "Error occured while saving password to the database")
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

const updateUserPfp = asyncHandler(async (req, res) => {
    if (!(req.file?.path)) {
        throw new ApiError(400, "Please provide pfp to be updated");
    }
    const user = await Student.findById(req.user._id);
    if(user.pfp.length>0)
    {
        try {
            await destroyOnCloudinary(user.pfp)
        } catch (error) {
            throw new ApiError(400, "Error deleting old pfp from cloudinary")
        }
            
    }
    const newPfp = await uploadOnCloudinary(req.file.path)
    user.pfp = newPfp.url;
    try {
        await user.save({ validateBeforeSave: false });
    } catch (error) {
        throw new ApiError(400, "Error while saving into database:",error)
    }
    return res.status(200)
        .json(
            new ApiResponse(
                200,
                user.pfp,
                "pfp updated successfully"
            )
        )
})

const deleteStudent = asyncHandler(async (req, res) => {
    const { id } = req.body
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

const updateHandles = asyncHandler(async(req,res)=>{
    try {
        const{codechef,codeforces,leetcode,github} = req.body;
        const user = await Student.findById(req.user._id)
        if (codechef !== undefined && codechef !== null && codechef !== '') {
            user.codingPlatforms.codechef.username = codechef;
        }
        if (codeforces !== undefined && codeforces !== null && codeforces !== '') {
            user.codingPlatforms.codeforces.username = codeforces;
        }
        if (leetcode !== undefined && leetcode !== null && leetcode !== '') {
            user.codingPlatforms.leetcode.username = leetcode;
        }
        if (github !== undefined && github !== null && github !== '') {
            user.github = github;
        }
        user.codingPlatforms.lastupdated = undefined;
        await user.save({validationBeforeSave:false})
    } catch (error) {
        throw new ApiError(400,error);
    }
    return res.status(200).json(  
        new ApiResponse(
            200,
            "User Handles Updated Successfully"
        )
    );
})

const scrapeRatingLeetcode = async (leetcode) => {
    const platformId = leetcode.username;
    const url1 = `https://alfa-leetcode-api.onrender.com/${platformId}/contest`;
    const url2 = `https://alfa-leetcode-api.onrender.com/${platformId}/solved`;

    try {
        const response1 = await fetch(url1);
        if (response1.ok) {
            const res1 = await response1.json();
            leetcode.rating = res1.contestRating;
        } else {
            throw new ApiError(404, "Error fetching rating from Leetcode URL");
        }

        const response2 = await fetch(url2);
        if (response2.ok) {
            const res2 = await response2.json();
            leetcode.problemSolved = res2.solvedProblem;
        } else {
            throw new ApiError(404, "Error fetching problems solved from Leetcode URL");
        }

    } catch (error) {
        console.error("Error in scraping:", error);
        throw error; // Re-throwing the error to propagate it further
    }
    console.log(leetcode);
};

const scrapeRatingCodeforces = async (codeforces) => {
    const platformId = codeforces.username;
    const url1 = `https://codeforces.com/api/user.info?handles=${platformId}`;
    const url2 = `https://codeforces.com/api/user.status?handle=${platformId}`;

    try {
        const response1 = await fetch(url1);
        if (response1.ok) {
            const res1 = await response1.json();
            codeforces.rating = res1.result[0].rating;
        } else {
            throw new ApiError(404, "Error fetching rating codeforces URL");
        }

        const response2 = await fetch(url2);
        if (response2.ok) {
            const res2 = await response2.json();
            const set = new Set();
            res2.result.forEach(element => {
                if(element.verdict === "OK"){
                    const tmp =  element.problem.index + " " + element.problem.name + " " + element.problem.contestId;
                    set.add(tmp);
                }
            });
            codeforces.problemSolved = set.size;    
        } else {
            throw new ApiError(404, "Error fetching problems solved from Codeforces URL");
        }

    } catch (error) {
        console.error("Error in scraping:", error);
        throw error; // Re-throwing the error to propagate it further
    }
    console.log(codeforces);
};
const scrapeRatingCodechef = async(codechef)=>{
    const platformId = codechef.username;
    const url = `https://www.codechef.com/users/${platformId}`;

    const response = await fetch(url);

    if(!response.ok){
        throw new ApiError(404,"error fetching from url");
    }
    const html = await response.text();
    const $ = cheerio.load(html);
    const rating = $('.rating-number').text();
    codechef.rating = rating;
    console.log(codechef);
}

export { registerStudent, loginStudent, deleteStudent, logoutStudent, refreshAccessToken, getUser, changePassword, updateUserPfp, isAuthorized,updateHandles,scrapeRatingLeetcode,scrapeRatingCodechef, updateRating} 