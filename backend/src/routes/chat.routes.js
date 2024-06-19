import Router from "express"
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { accessChat, fetchChats, createGroupChat, renameGroup, removeFromGroup, addToGroup } from "../controllers/chat.controller.js";

const router = Router();

router.route('/chat').post(verifyJWT, accessChat)
router.route('/getChats').get(verifyJWT, fetchChats)
router.route('/group').post(verifyJWT, createGroupChat)
router.route('/renameGroup').put(verifyJWT, renameGroup)
router.route('/removeFromGroup').put(verifyJWT, removeFromGroup)
router.route('/addToGroup').put(verifyJWT, addToGroup)

export default router