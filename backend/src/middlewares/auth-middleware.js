import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { ENV_VAR } from "../config/index.js";
import UserModel from "../models/user-model.js";

export const authenticate = async (req, res, next) => {
  let token = req?.cookies?.token;
  if (!token)
    return res.status(StatusCodes.UNAUTHORIZED).json({
      success: false,
      message: "Please Login",
    });

  let decodedToken = await jwt.verify(token, ENV_VAR.JWT_SECRET_KEY);
  let user = await UserModel.findById(decodedToken.id);
  if (!user)
    return res.status(StatusCodes.UNAUTHORIZED).json({
      success: false,
      message: "Invalid Session",
    });

  req.user = user;
  next();
};
