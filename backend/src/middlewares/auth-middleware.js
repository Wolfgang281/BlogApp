import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { ENV_VAR } from "../config/index.js";
import UserModel from "../models/user-model.js";
import AppError from "../utils/app-error-util.js";

export const authenticate = async (req, res, next) => {
  let token = req?.cookies?.token; // (optional chaining)
  if (!token)
    return next(
      new AppError(
        "Please Login to access this resource",
        StatusCodes.UNAUTHORIZED,
      ),
    );

  let decodedToken = await jwt.verify(token, ENV_VAR.JWT_SECRET_KEY);
  let user = await UserModel.findById(decodedToken.id);
  if (!user)
    return next(
      new AppError(
        "Invalid Session, Please login again",
        StatusCodes.UNAUTHORIZED,
      ),
    );

  req.user = user;
  next();
};
