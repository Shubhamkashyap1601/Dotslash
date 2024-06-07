import { Router } from "express";
import {verifyJWT} from "../middlewares/auth.middleware.js"
import { createBlog, fetchBlogs, fetchOneBlog, incrementLikes } from "../controllers/blog.controller.js"
import {upload} from "../middlewares/multer.middleware.js"


const router = Router();

router.route("/create-blog").post(verifyJWT,upload.single('imageURL'),createBlog);
router.route("/fetch-blogs").get(verifyJWT,fetchBlogs);
router.route("/like").post(verifyJWT,incrementLikes);

router.route("/blog/:blogId").get(verifyJWT,fetchOneBlog)

export default router