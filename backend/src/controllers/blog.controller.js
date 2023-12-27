import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Blog } from "../models/blog.model.js";
import { Student } from "../models/student.model.js";

import { uploadOnCloudinary } from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";

const createBlog = asyncHandler(async (req, res) => {
  const { title, description, content, imageURL } = req.body;
  const author = req.user.username;
  if (title?.trim() === "") {
    throw new ApiError(400, "Title is required");
  } else if (description?.trim() === "") {
    throw new ApiError(400, "Description is required");
  } else if (content?.trim() === "") {
    throw new ApiError(400, "Content is required");
  } else if (author?.trim() === "") {
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
    });
    const createdBLog = await Blog.findById(blog._id);
    return res
      .status(201)
      .json(new ApiResponse(200, createdBLog, "Blog created successfulluy"));
  } catch (err) {
    throw new ApiError(
      500,
      `Something went wrong while creating the blog: ${err.message}`
    );
  }
});
const fetchBlogs = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  let user;
  try {
    user = await Student.findById(userId);
  } catch (error) {
    throw new ApiError(
      500,
      `Something went wrong while finding the current user: ${error.message}`
    );
  }

  const likedBlogs = user?.likedBlogs;

  try {
    let blogs = await Blog.find({}).sort({ createdAt: -1 });

    let modifiedBlogs = blogs.map((blog) => {
      let modifiedBlog = {...blog}._doc;
      if (likedBlogs.includes(modifiedBlog._id)) {
        modifiedBlog.isLiked = true;
      } else {
        modifiedBlog.isLiked = false;
      }
      return modifiedBlog;
    });

    res.json(modifiedBlogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Fetching all blogs unsuccessful" });
  }
});


const incrementLikes = asyncHandler(async (req, res) => {
  const { _id } = req.body;
  const blogId = _id;
  const userId = req.user._id;
  const user = await Student.findById(userId);
  let alreadyLiked = false;
  user.likedBlogs.forEach((id) => {
    if (id == blogId) {
      alreadyLiked = true;
      return;
    }
  });
  const blog = await Blog.findById(blogId);
  if (alreadyLiked) {
    blog.likes = blog.likes - 1;
    const temp = user.likedBlogs.filter((id) => {
        if(id!=blogId) return true;
        else return false;
    });
    user.likedBlogs = temp;
  } else {
    blog.likes = blog.likes + 1;
    user.likedBlogs.push(blogId);   
  }

  try {
    await blog.save();
    await user.save();
  } catch (error) {
    throw new ApiError(
      401,
      error?.message || "Error occured while saving to the database"
    );
  }
  return res.status(200).json({likes:blog.likes,isLiked:alreadyLiked});
});
export { createBlog, fetchBlogs, incrementLikes };
