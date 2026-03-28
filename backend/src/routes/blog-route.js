import { Router } from "express";

import { addBlog } from "../controllers/blog-controller.js";

import { authenticate } from "../middlewares/auth-middleware.js";
import upload from "../middlewares/multer-middleware.js";

const router = Router();

router.post("/add", authenticate, upload.single("coverImage"), addBlog);

export default router;
