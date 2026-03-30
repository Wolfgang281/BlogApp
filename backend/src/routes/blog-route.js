import { Router } from "express";

import {
  addBlog,
  getBlog,
  getBlogs,
  updateBlog,
} from "../controllers/blog-controller.js";

import { authenticate } from "../middlewares/auth-middleware.js";
import upload from "../middlewares/multer-middleware.js";

const router = Router();

router.post("/add", authenticate, upload.single("coverImage"), addBlog);

router.get("/all", getBlogs);

router.patch(
  "/edit/:blogId",
  authenticate,
  upload.single("coverImage"),
  updateBlog,
);

router.get("/:blogId", getBlog); //TODO:greedy route

export default router;
