import { StatusCodes } from "http-status-codes";

import crypto from "node:crypto";
import { ENV_VAR } from "../config/index.js";
import UserModel from "../models/user-model.js";
import AppError from "../utils/app-error-util.js";
import { generateJWT } from "../utils/jwt-util.js";
import { sendVerificationLink } from "../utils/nodemailer-util.js";

export const register = async (req, res, next) => {
  try {
    let { name, email, password } = req.body;
    let newUser = await UserModel.create({ name, email, password });

    let rawToken = await newUser.generateVerificationToken();
    console.log("rawToken: ", rawToken);

    let verificationLink = `${ENV_VAR.FRONTEND_URL}/api/auth/verify-email/${rawToken}`;

    let result = await sendVerificationLink(email, verificationLink, next);
    console.log("result: ", result);

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
  try {
    let { email, password } = req.body;
    let user = await UserModel.findOne({ email });

    if (!user)
      return next(new AppError("Invalid Credentials", StatusCodes.NOT_FOUND));

    let isMatch = await user.comparePassword(password);
    if (!isMatch)
      return next(new AppError("Invalid Credentials", StatusCodes.NOT_FOUND));

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
  } catch (error) {
    next(error);
  }
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
export const currentUser = async (req, res, next) => {
  res.status(StatusCodes.OK).json({
    success: true,
    message: "User fetched Successfully",
    payload: req.user, //? this is coming from middleware
  });
};

export const verifyEmail = async (req, res, next) => {
  try {
    let { rawToken } = req.params;
    let hashedToken = crypto
      .createHash("sha256")
      .update(rawToken)
      .digest("hex");

    let user = await UserModel.findOne({
      isVerifiedToken: hashedToken,
    });
    console.log("user: ", user.isVerifiedTokenExpire);
    console.log(Date.now());

    if (!user)
      return next(new AppError("No User Found", StatusCodes.NOT_FOUND));

    if (user.isVerifiedTokenExpire < Date.now()) {
      return next(
        new AppError("Verification Link is Expired", StatusCodes.GONE),
      );
    }

    user.isVerified = true;
    user.isVerifiedToken = undefined;
    user.isVerifiedTokenExpire = undefined;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Email Successfully Verified",
    });
  } catch (error) {
    if (user) {
      user.isVerifiedToken = undefined;
      user.isVerifiedTokenExpire = undefined;
      await user.save();
    }
    next(error);
  }
};

export const forgotPassword = async (req, res, next) => {};

export const resetPassword = async (req, res, next) => {};

//! === get user profile ===
