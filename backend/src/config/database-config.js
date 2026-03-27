import mongoose from "mongoose";

import { ENV_VAR } from "./index.js";

export const connectDB = async () => {
  await mongoose.connect(ENV_VAR.MONGODB_URL);
  console.log("MongoDB connected");
};
