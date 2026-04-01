import { Router } from "express";
import { createPayment } from "../controllers/payment-controller.js";
import { authenticate } from "../middlewares/auth-middleware.js";

const router = Router();

router.post("/create", authenticate, createPayment);

export default router;
