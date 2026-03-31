import { ENV_VAR } from "../config/index.js";
import transporter from "../config/nodemailer-config.js";

export const sendVerificationLink = async (to, message, next) => {
  try {
    return await transporter.sendMail({
      from: ENV_VAR.NODEMAILER_EMAIL,
      to,
      subject: "Email for Account Verification",
      text: "Please don not reply",
      html: `<h1> Verification Link ${message} </h1>`,
    });
    // console.log(result);
  } catch (error) {
    return next(error);
  }
};
