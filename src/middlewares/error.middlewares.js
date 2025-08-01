import { MongooseError } from "mongoose";
import { ApiError } from "../utils/apiError.js";
import "dotenv/config";

const errorHandler = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof Error)) {
    // next();
    return;
  }
  if (!(error instanceof ApiError)) {
    let statusCode;
    if (error.status) {
      statusCode = error.status;
    } else {
      if (error instanceof MongooseError) {
        statusCode = 502;
      } else {
        statusCode = 420;
      }
    }
    // ? error.status
    // : error instanceof MongooseError
    //   ? 502
    //   : 420;

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
