import {Router} from "express"
import { registerStudent,studentLogin,deleteStudent} from "../controllers/student.controller.js"

const router = Router();

router.route("/register").post(registerStudent);
router.route("/login").post(studentLogin);
router.route("/delete").post(deleteStudent);
export default router;