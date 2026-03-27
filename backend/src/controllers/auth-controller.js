import { StatusCodes } from "http-status-codes";

import UserModel from "../models/user-model.js";
import { generateJWT } from "../utils/jwt-util.js";

export const register = async (req, res, next) => {
  try {
    let { name, email, password } = req.body;
    let newUser = await UserModel.create({ name, email, password });

    res.status(StatusCodes.CREATED).json({
      success: true,
      message: "User Registered Successfully",
      newUser,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  let { email, password } = req.body;
  let user = await UserModel.findOne({ email });

  if (!user)
    return res.status(StatusCodes.NOT_FOUND).json({
      success: false,
      message: "Invalid Credentials",
    });

  let isMatch = await user.comparePassword(password);
  if (!isMatch)
    return res.status(StatusCodes.NOT_FOUND).json({
      success: false,
      message: "Invalid Credentials",
    });

  let token = await generateJWT(user._id);
  res.cookie("token", token, {
    maxAge: 1 * 60 * 60 * 1000,
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  res.status(StatusCodes.OK).json({
    success: true,
    message: "User logged in successfully",
  });
};

export const logout = async (req, res, next) => {
  res.clearCookie("token", {
    maxAge: 1 * 60 * 60 * 1000,
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
  res.status(StatusCodes.OK).json({
    success: true,
    message: "User logged out successfully",
  });
};

//! this is used while developing frontend
export const currentUser = async (req, res, next) => {};
