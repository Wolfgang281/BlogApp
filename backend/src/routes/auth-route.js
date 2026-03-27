import { Router } from "express";

import { register } from "../controllers/auth-controller.js";
import { validateBody } from "../middlewares/validate-body-middleware.js";
import { registerSchema } from "../validators/user-validator.js";

const router = Router();

router.post("/register", validateBody(registerSchema), register);

export default router;
