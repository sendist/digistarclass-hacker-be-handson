const express = require("express");
const {
  validateAddUser,
  validateUpdateUser,
  validateLogin,
} = require("../middlewares/userValidator");
const UserController = require("../controller/userController");
const Auth = require("../controller/authController");
const tryCatch = require("../helper/helper");
const { checkDuplicateEmail } = require("../middlewares/registerCheck");
const { checkJWT } = require("../middlewares/auth");

const router = express.Router();

router.post(
  "/signUp",
  validateAddUser,
  tryCatch(checkDuplicateEmail),
  tryCatch(Auth.signUp)
);

router.post("/signIn", validateLogin, tryCatch(Auth.signIn));

router.use(checkJWT);

router.get("/data", tryCatch(UserController.getUserData));

router.get("/", UserController.getAllusers);

router.put("/", validateUpdateUser, tryCatch(UserController.updateUser));

router.delete("/", tryCatch(UserController.deleteUser));

module.exports = router;
