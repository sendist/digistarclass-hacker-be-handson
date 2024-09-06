const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const uri = process.env.MONGODB_URI;
async function connectDB() {
  try {
    await mongoose.connect(uri);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Yeay connect");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}
async function disconnectDB() {
  try {
    await mongoose.diconnect();
    console.log("yeay disconnect");
  } catch (error) {
    process.exit(1);
  }
}

module.exports = {
  connectDB,
  disconnectDB,
};
