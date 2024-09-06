const ApiError = require("../errors/ApiError");
const { verifyJWT } = require("../helper/jwt");
const UserQuery = require("../query/userQuery");

const checkJWT = async (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    ApiError.unAuthorized("A token is required for authentication");
  }

  try {
    const decoded = verifyJWT(token.split(" ")[1]);
    req.user = decoded;

    const isUserExists = await UserQuery.getUsers(decoded.email);

    if (!isUserExists) {
      return res
        .status(401)
        .json({ message: "User dengan token ini sudah tidak ada" });
    }

    next();
  } catch (err) {
    next(ApiError.unAuthorized("Invalid Token"));
  }
};

module.exports = {
  checkJWT,
};
