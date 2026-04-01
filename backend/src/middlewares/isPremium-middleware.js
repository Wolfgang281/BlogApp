import { StatusCodes } from "http-status-codes";
import AppError from "../utils/app-error-util.js";

export const checkPremium = (req, res, next) => {
  if (!req.user.isPremium)
    return next(
      new AppError("Subscribe for this feature", StatusCodes.FORBIDDEN),
    );

  next();
};
