import { StatusCodes } from "http-status-codes";

import UserModel from "../models/user-model.js";

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

export const login = async (req, res, next) => {};

export const logout = async (req, res, next) => {};

//! this is used while developing frontend
export const currentUser = async (req, res, next) => {};
