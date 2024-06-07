import { Router } from "express";
import { getResources, postResources } from "../controllers/resource.controller.js";

const router = new Router();

router.route("/resources").get(getResources);
router.route("/resources").post(postResources);

export default router;