import { StatusCodes } from "http-status-codes";
import AppError from "../utils/app-error-util.js";

export const isVerified = (req, res, next) => {
  if (!req.user.isVerified)
    return next(
      new AppError("Please Verify Your Account First", StatusCodes.FORBIDDEN),
    );
  else next();
};
