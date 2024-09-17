const { StatusCodes } = require("http-status-codes");

class ServiceError extends Error {
  constructor(
    message = "Something went wrong",
    explanation = "Service layer Error",
    StatusCode = StatusCodes.INTERNAL_SERVER_ERROR
  ) {
    super();
    this.name = "ServiceError";
    this.message = message;
    this.explanation = explanation;
    this.statusCode = StatusCode;
  }
}

module.exports = ServiceError;
