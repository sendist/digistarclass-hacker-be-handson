const { body } = require("express-validator");
const {validationResult} = require("express-validator");

const validateAddUser = [
  body("name")
    .isString()
    .isLength({ min: 3, max: 15 })
    .withMessage("nama harus berupa string dan memiliki panjang 3-15 karakter"),
  body("email")
    .exists()
    .isEmail()
    .withMessage("email wajib diisi dan harus berupa email valid"),
  body("password")
    .isString()
    .isLength({ min: 7, max: 15 })
    .withMessage(
      "password harus berupa string dan memiliki panjang 7-15 karakter"
    ),
  body("profilePhoto")
    .optional()
    .isURL()
    .withMessage("linkImgProfile harus berupa URL"),
];

const validateUpdateUser = [
  body("name")
    .optional()
    .isString()
    .isLength({ min: 3, max: 15 })
    .withMessage("nama harus berupa string dan memiliki panjang 3-15 karakter"),
  body("profilePhoto")
    .optional()
    .isURL()
    .withMessage("linkImgProfile harus berupa URL"),
];

const validateLogin = [
  body("email").isEmail(),
  body("password").isLength({ min: 7, max: 15 }),
];

const isBodyValid = (req, res) => {
  const { errors } = validationResult(req);
  if (errors.length > 0) {
    res.status(400).json({ message: errors });
    return false;
  }
  return true;
};

module.exports = {
  validateAddUser,
  validateLogin,
  validateUpdateUser,
  isBodyValid,
};
