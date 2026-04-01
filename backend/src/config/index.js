import dotenv from "dotenv";
dotenv.config({ quiet: true });

//FIXME: make separate exports
export const ENV_VAR = {
  PORT: process.env.PORT,
  MONGODB_URL: process.env.MONGODB_URL,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  FRONTEND_URL: process.env.FRONTEND_URL,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  NODEMAILER_PASSWORD: process.env.NODEMAILER_PASSWORD,
  NODEMAILER_EMAIL: process.env.NODEMAILER_EMAIL,
  NODEMAILER_SERVICE: process.env.NODEMAILER_SERVICE,
  NODEMAILER_SECURE: process.env.NODEMAILER_SECURE,
  NODEMAILER_PORT: process.env.NODEMAILER_PORT,
  GEMINI_API_KEY: process.env.GEMINI_API_KEY,
};
