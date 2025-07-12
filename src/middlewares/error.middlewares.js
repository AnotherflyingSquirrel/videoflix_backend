import { MongooseError } from "mongoose";
import { ApiError } from "../utils/apiError.js";
import "dotenv/config";

const errorHandler = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof Error)) {
    return;
  }
  if (!(error instanceof ApiError)) {
    const statusCode = error.status
      ? error.status
      : error instanceof MongooseError
        ? 502
        : 420;
    const message = error.message || "something went wrong!";
    error = new ApiError(
      statusCode,
      error?.errors || [],
      message,
      error.stack ? error.stack : ""
    );
  }
  const response = {
    ...error,
    message: error.message,
    ...(process.env.NODE_ENV === "development" ? { stack: error.stack } : {}),
  };
  return res.status(error.status).json(response);
};

export { errorHandler };
