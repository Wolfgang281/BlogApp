import express from "express";

import cookieParser from "cookie-parser";
import cors from "cors";

import { errorHandler } from "./middlewares/error-handler-middleware.js";

import { ENV_VAR } from "./config/index.js";

import authRoutes from "./routes/auth-route.js";
import blogRoutes from "./routes/blog-route.js";
import paymentRoutes from "./routes/payment-route.js";

const app = express();

app.use(
  cors({
    origin: ENV_VAR.FRONTEND_URL,
    credentials: true,
  }),
);

app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/payment", paymentRoutes);

app.use(errorHandler);

export default app;
