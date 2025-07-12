class ApiResponse {
  constructor(statusCode, message = "success", data) {
    this.data = data;
    this.status = statusCode;
    this.message = message;
    this.isSuccessful = statusCode < 400;
  }
}

export { ApiResponse };
