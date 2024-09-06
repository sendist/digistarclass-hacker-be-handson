const {
  verifyRefreshToken,
  signJWT,
  signRefreshToken,
} = require("../helper/jwt");
const UserQuery = require("../query/userQuery");
const { isBodyValid } = require("../middlewares/userValidator");
const ApiError = require("../errors/ApiError");

class Auth {
  static async signUp(req, res, next) {
    if (!isBodyValid(req, res)) return;

    const user = await UserQuery.createOneUser(req.body);
    const token = signJWT({ id: user._id, email: user.email });
    const refreshToken = signRefreshToken({
      id: user._id,
      email: user.email,
      tokenVersion: user.tokenVersion,
    });

    res.cookie("be7", refreshToken, {
      httpOnly: true,
      path: "/refreshToken",
    });

    res.status(200).send({
      message: "Succesfully signUp",
      accessToken: token,
    });
  }

  static async signIn(req, res, next) {
    if (!isBodyValid(req, res)) return;
    let user = await UserQuery.getUsers(req.body.email);

    if (!user) {
      throw ApiError.badRequest("User not found", {
        message: "Please check your email",
      });
    }

    if (user.password !== req.body.password) {
      throw ApiError.badRequest("Wrong password", {
        message: "Please check your password",
      });
    }

    const token = signJWT({ id: user._id, email: user.email });
    const refreshToken = signRefreshToken({
      id: user._id,
      email: user.email,
      tokenVersion: user.tokenVersion,
    });

    res.cookie("be7", refreshToken, {
      httpOnly: true,
      path: "/refreshToken",
    });

    res.status(200).send({
      message: "Succesfully login",
      accessToken: token,
    });
  }


  static refreshToken = async (req, res, next) => {
    try {
      const refreshToken = req.cookies.be7;

      if (!refreshToken) {
        throw ApiError.unAuthorized("Refresh token not found");
      }
      const decoded = verifyRefreshToken(refreshToken);

      const user = await UserQuery.getUsers(decoded.email);

      if (!user) {
        throw ApiError.unAuthorized("User not found");
      }
      if (user.tokenVersion !== decoded.tokenVersion) {
        throw ApiError.unAuthorized("Invalid refresh token");
      }

      const newAccessToken = signJWT({
        id: decoded._id,
        email: decoded.email,
      });
      const newRefreshToken = signRefreshToken({
        id: decoded._id,
        email: decoded.email,
        tokenVersion: user.tokenVersion,
      });

      res.cookie("be7", newRefreshToken, {
        httpOnly: true,
        path: "/refreshToken",
      });

      res.status(200).send({
        accessToken: newAccessToken,
      });
    } catch (error) {
      next(ApiError.unAuthorized("Invalid refresh token"));
    }
  };

  static revokeAllAccess = async (req, res, next) => {
    try {
      const user = await UserQuery.getUsers(req.body.email);

      if (
        user.password !== req.body.password &&
        user.email !== req.body.email
      ) {
        throw ApiError.unAuthorized("User not found");
      }

      await UserQuery.updateTokenVersion(user.email);

      const newAccessToken = signJWT({
        id: user._id,
        email: user.email,
      });
      const newRefreshToken = signRefreshToken({
        id: user._id,
        email: user.email,
        tokenVersion: user.tokenVersion,
      });

      res.cookie("be7", newRefreshToken, {
        httpOnly: true,
        path: "/refreshToken",
      });

      res.status(200).send({
        accessToken: newAccessToken,
      });
    } catch (error) {
      next(ApiError.unAuthorized(error));
    }
  };
}

module.exports = Auth;
