import { Router } from "express";

import {
  currentUser,
  login,
  logout,
  register,
  verifyEmail,
} from "../controllers/auth-controller.js";

import { authenticate } from "../middlewares/auth-middleware.js";
import { validateBody } from "../middlewares/validate-body-middleware.js";

import { loginSchema, registerSchema } from "../validators/user-validator.js";

const router = Router();

router.post("/register", validateBody(registerSchema), register);
router.post("/login", validateBody(loginSchema), login);
router.post("/logout", authenticate, logout);

router.get("/current", authenticate, currentUser);

router.get("/verify-email/:rawToken", verifyEmail);

export default router;
