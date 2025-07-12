class ApiError extends Error {
  constructor(
    statusCode,
    error = [],
    message = "unsuccessful API execution",
    stack
  ) {
    super(message);
    this.status = statusCode;
    this.message = message;
    this.errors = error;
    this.success = false;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.error);
    }
  }
}

export { ApiError };
