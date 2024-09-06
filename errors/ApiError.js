const { NOTFOUND, BADREQUEST, UNAUTHORIZED } = require("../helper/constant");

class ApiError extends Error {
  constructor(errorCode, message, errorMessage) {
    super(message);
    this.errorCode = errorCode;
    this.errorMessage = errorMessage;
  }

  static notFound(message) {
    return new ApiError(NOTFOUND, message, { message });
  }

  static badRequest(message, errorMessage) {
    return new ApiError(BADREQUEST, message, errorMessage);
  }

  static unAuthorized(message) {
    return new ApiError(UNAUTHORIZED, message, { message });
  }
}

module.exports = ApiError;
