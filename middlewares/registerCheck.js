const ApiError = require("../errors/ApiError");
const User = require("../model/User");

const checkDuplicateEmail = async function (req, res, next) {
  const { email } = req.body;
  const user = await User.findOne({ email: email });
  if (user) {
    throw ApiError.badRequest(
      "Email already exists",
      "Email should not be the same"
    );
  }

  next();
};

module.exports = {
  checkDuplicateEmail,
};
