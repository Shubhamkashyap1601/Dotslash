import {Router} from "express"
import { registerStudent,loginStudent,deleteStudent,logoutStudent,refreshAccessToken} from "../controllers/student.controller.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"

const router = Router();

router.route("/register").post(registerStudent);
router.route("/login").post(loginStudent);
router.route("/logout").post(verifyJWT, logoutStudent);
router.route("/delete").post(deleteStudent);
router.route("/refreshAccessToken").post(refreshAccessToken);
export default router;