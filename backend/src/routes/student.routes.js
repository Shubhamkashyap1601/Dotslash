import {Router} from "express"
import { registerStudent,loginStudent,deleteStudent,logoutStudent,refreshAccessToken,getUser,isAuth} from "../controllers/student.controller.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"
import {upload} from "../middlewares/multer.middleware.js"
import { fetchLikedBlogs } from "../controllers/blog.controller.js";


const router = Router();

router.route("/register").post(upload.single('pfp'),registerStudent);
router.route("/login").post(loginStudent);
router.route("/logout").post(verifyJWT, logoutStudent);
// router.route("/delete").post(deleteStudent);

router.route("/refreshAccessToken").post(refreshAccessToken);
router.route("/user/:username").get(getUser);
router.route("/user/:username/liked").get(fetchLikedBlogs);
router.route("/auth").get(verifyJWT,isAuth)
export default router;