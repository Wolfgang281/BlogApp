import { Router } from "express";

import {
  addBlog,
  deleteBlog,
  getBlog,
  getBlogs,
  updateBlog,
} from "../controllers/blog-controller.js";

import { authenticate } from "../middlewares/auth-middleware.js";
import { isVerified } from "../middlewares/is-verified-middleware.js";
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
  isVerified,
  upload.single("coverImage"),
  validateBody(addBlogSchema),
  addBlog,
);

router.get("/all", getBlogs);

router.patch(
  "/edit/:blogId",
  authenticate,
  isVerified,
  validateBody(updateBlogSchema),
  upload.single("coverImage"),
  updateBlog,
);

router.get("/:blogId", getBlog);

router.delete("/delete/:blogId", authenticate, isVerified, deleteBlog);

export default router;
