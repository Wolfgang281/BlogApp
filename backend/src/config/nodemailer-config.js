import nodemailer from "nodemailer";

import { ENV_VAR } from "./index.js";

const transporter = nodemailer.createTransport({
  service: ENV_VAR.NODEMAILER_SERVICE,
  secure: ENV_VAR.NODEMAILER_SECURE,
  port: ENV_VAR.NODEMAILER_PORT,
  auth: {
    user: ENV_VAR.NODEMAILER_EMAIL,
    pass: ENV_VAR.NODEMAILER_PASSWORD,
  },
});

export default transporter;
