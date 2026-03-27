import express from "express";

import cors from "cors";

import { errorHandler } from "./middlewares/error-handler-middleware.js";

import { ENV_VAR } from "./config/index.js";
import authRoutes from "./routes/auth-route.js";

const app = express();

app.use(
  cors({
    origin: ENV_VAR.FRONTEND_URL,
    credentials: true,
  }),
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/auth", authRoutes);

app.use(errorHandler);

export default app;
