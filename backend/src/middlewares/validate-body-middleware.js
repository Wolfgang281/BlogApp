import { StatusCodes } from "http-status-codes";
import AppError from "../utils/app-error-util.js";

export const validateBody = (schema) => {
  return (req, res, next) => {
    let { error, value } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      console.log("error: ", error);
      let errorMsgs = error.details.map((err) => err.message).join(",");
      return next(new AppError(errorMsgs, StatusCodes.BAD_REQUEST));
    }
    req.body = value;
    next();
  };
};
// let errorMessagesBefore = ["e1", "e2", "e3"];
// let errorMessagesAfter = `"e1", "e2", "e3"`;
