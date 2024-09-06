const { sign, verify } = require("jsonwebtoken");

const verifyJWT = (token) => verify(token, process.env.JWT_SECRET);
const signJWT = (payload) =>
  sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

const verifyRefreshToken = (token) =>
  verify(token, process.env.JWT_SECRET_REFRESH_TOKEN);

const signRefreshToken = (payload) =>
  sign(payload, process.env.JWT_SECRET_REFRESH_TOKEN, {
    expiresIn: "7d",
  });
module.exports = { verifyJWT, signJWT, verifyRefreshToken, signRefreshToken };
