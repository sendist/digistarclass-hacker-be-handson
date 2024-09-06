const express = require("express");
const cookieParser = require("cookie-parser");
const userRouter = require("./router/userRouter");
const db = require("./db/dbConfig");
const errorHandler = require("./middlewares/errorHandler");
const ApiError = require("./errors/ApiError");
const Auth = require("./controller/authController");
require("dotenv").config();

db.connectDB();
const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/users/", userRouter);

app.get("/refreshToken", Auth.refreshToken);

app.post("/revokeAllAccess", Auth.revokeAllAccess);

app.use("*", (req, res, next) => {
  throw ApiError.notFound("404 Page Not Found");
});

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log("Listening to Port " + process.env.PORT);
});
