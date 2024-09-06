const ApiError = require("../errors/ApiError");
const { INTERNAL_SERVER_ERROR } = require("../helper/constant");

const errorHandler = (error, req, res, next) => {
  if (error instanceof ApiError) {
    res.status(error.errorCode).send({
      message: error.message,
      errorMessage: error.errorMessage,
    });
    return;
  }

  res.status(INTERNAL_SERVER_ERROR).send(error.message);
};

module.exports = errorHandler;
