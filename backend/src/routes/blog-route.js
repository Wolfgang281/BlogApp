import { Router } from "express";

import {
  addBlog,
  deleteBlog,
  getBlog,
  getBlogs,
  updateBlog,
} from "../controllers/blog-controller.js";

import { authenticate } from "../middlewares/auth-middleware.js";
import upload from "../middlewares/multer-middleware.js";
import { validateBody } from "../middlewares/validate-body-middleware.js";
import {
  addBlogSchema,
  updateBlogSchema,
} from "../validators/blog-validator.js";

const router = Router();

router.post(
  "/add",
  authenticate,
  upload.single("coverImage"),
  validateBody(addBlogSchema),
  addBlog,
);

router.get("/all", getBlogs);

router.patch(
  "/edit/:blogId",
  authenticate,
  validateBody(updateBlogSchema),
  upload.single("coverImage"),
  updateBlog,
);

router.get("/:blogId", getBlog);

router.delete("/delete/:blogId", authenticate, deleteBlog);

export default router;
