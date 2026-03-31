import { ENV_VAR } from "../config/index.js";
import transporter from "../config/nodemailer-config.js";

export const sendVerificationLink = async (to, message, next) => {
  try {
    return await transporter.sendMail({
      from: ENV_VAR.NODEMAILER_EMAIL,
      to,
      subject: "Email for Account Verification",
      text: "Please don not reply",
      html: `
        <div style="font-family: sans-serif; padding: 20px;">
        <h2>Verify Your Account</h2>
        <p>Click the button below to verify your email address.</p>
        <a href="${message}" 
            style="background:#4F46E5; color:white; padding:10px 20px; 
            border-radius:5px; text-decoration:none;">
            Verify Email
        </a>
        <p style="margin-top:15px; color:gray; font-size:12px;">
            This link expires in 24 hours.
        </p>
        </div>
`,
    });
    // console.log(result);
  } catch (error) {
    return next(error);
  }
};
