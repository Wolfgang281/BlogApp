import { StatusCodes } from "http-status-codes";

export const validateBody = (schema) => {
  return (req, res, next) => {
    let { error, value } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      let errorMsgs = error.details.map((err) => err.message);
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        errorMsgs,
      });
    }
    req.body = value;
    next();
  };
};
