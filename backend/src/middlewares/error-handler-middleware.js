import { StatusCodes } from "http-status-codes";
import multer from "multer";

export const errorHandler = (err, req, res, next) => {
  // Default values
  let statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  let message = err.message || "Internal Server Error";

  //! 1) Mongoose CastError -> invalid ObjectId (e.g. BlogModel.findById("abc123"))
  if (err.name === "CastError") {
    statusCode = StatusCodes.BAD_REQUEST;
    message = `Invalid ${err.path}: ${err.value}. Please provide a valid ID.`;
  }

  //! 2) Mongoose ValidationError -> schema validation failed (e.g. required field missing)
  if (err.name === "ValidationError") {
    statusCode = StatusCodes.BAD_REQUEST;
    const fields = Object.values(err.errors).map((e) => e.message);
    message = `Validation Failed: ${fields.join(", ")}`;
  }

  //! 3) Mongoose Duplicate Key Error -> unique constraint violated (e.g. duplicate email)
  if (err.code === 11000) {
    statusCode = StatusCodes.CONFLICT;
    const field = Object.keys(err.keyValue)[0];
    message = `${field} already exists. Please use a different value.`;
  }

  //! 4) JWT Errors
  if (err.name === "JsonWebTokenError") {
    statusCode = StatusCodes.UNAUTHORIZED;
    message = "Invalid token. Please log in again.";
  }

  if (err.name === "TokenExpiredError") {
    statusCode = StatusCodes.UNAUTHORIZED;
    message = "Your session has expired. Please log in again.";
  }

  //! 5) Multer Errors (file upload issues)
  if (err instanceof multer.MulterError) {
    statusCode = StatusCodes.BAD_REQUEST;

    switch (err.code) {
      case "LIMIT_FILE_SIZE":
        message = "File is too large. Maximum allowed size is 1MB.";
        break;
      case "LIMIT_FILE_COUNT":
        message = "Too many files uploaded at once.";
        break;
      case "LIMIT_UNEXPECTED_FILE":
        message = `Unexpected field: ${err.field}. Please use the correct field name.`;
        break;
      default:
        message = `File upload error: ${err.message}`;
    }
  }

  //! 6) Custom AppError -> already has statusCode and message set
  //! Send the final error response
  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};
