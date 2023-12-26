import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/apiError.js"
import { ApiResponse } from "../utils/apiResponse.js"
import { Blog } from "../models/blog.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import jwt from "jsonwebtoken"

const createBlog = asyncHandler(async (req, res) => {

    const { title, description, content, imageURL } = req.body;
    const author = req.user.username;
    if (title?.trim() === "") {
        throw new ApiError(400, "Title is required");
    }
    else if (description?.trim() === "") {
        throw new ApiError(400, "Description is required");
    }
    else if (content?.trim() === "") {
        throw new ApiError(400, "Content is required");
    }
    else if (author?.trim() === "") {
        throw new ApiError(400, "Author is required");
    }

    try {
        const blog = await Blog.create({
            title,
            description,
            author,
            content,
            likes: 0,
            dislikes: 0,
        })
        const createdBLog = await Blog.findById(blog._id)
        return res.status(201).json(
            new ApiResponse(200, createdBLog, "Blog created successfulluy")
        )
    }
    catch (err) {
        throw new ApiError(500, `Something went wrong while creating the blog: ${err.message}`)
    }
})

const fetchBlogs = asyncHandler(async (req, res) => {
    try {
        const Blogs = await Blog.find({}).sort({ createdAt: -1 });
        res.json(Blogs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Fetching all blogs unsuccessful' });
    }
})

export { createBlog, fetchBlogs };