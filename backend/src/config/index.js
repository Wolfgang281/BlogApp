import dotenv from "dotenv";
dotenv.config({ quiet: true });

export const ENV_VAR = {
  PORT: process.env.PORT,
  MONGODB_URL: process.env.MONGODB_URL,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
};
