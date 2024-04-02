import { Router } from "express"
import { registerStudent, loginStudent, logoutStudent, refreshAccessToken, getUser, isAuthorized, updateUserPfp, updateHandles, scrapeRatingLeetcode, scrapeRatingCodechef } from "../controllers/student.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import { upload } from "../middlewares/multer.middleware.js"
import { fetchLikedBlogs } from "../controllers/blog.controller.js";


const router = Router();

router.route("/register").post(upload.single('pfp'), registerStudent);
router.route("/login").post(loginStudent);
router.route("/logout").post(verifyJWT, logoutStudent);
router.route("/refreshAccessToken").post(refreshAccessToken);
router.route("/user/:username").get(getUser);
router.route("/user/:username/liked").get(fetchLikedBlogs);
router.route("/authorized").get(verifyJWT, isAuthorized)
router.route("/updatePfp").post(verifyJWT,upload.single('pfp'),updateUserPfp);
router.route("/updateHandles").post(verifyJWT,updateHandles);
router.route("/leetcode/:platformId").get(scrapeRatingLeetcode);
router.route("/codechef/:platformId").get(scrapeRatingCodechef);

export default router;