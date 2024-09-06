const User = require("../model/User");

class UserQuery {
  static async createOneUser(user) {
    return await User.create(user);
  }

  static async getAllusers() {
    return await User.find().select({
      _id: 0, name: 1, email: 1, profilePhoto: 1,
    });
  }

  static async getUsers(email) {
    return await User.findOne({ email });
  }

  static async updateTokenVersion(email) {
    return await User.findOneAndUpdate(
      { email },
      { $inc: { tokenVersion: 1 } },
      { new: true }
    );
  }

  static async updateUser(user, changeUser) {
    return await User.findOneAndUpdate(
      { email: user.email },
      { $set: {
          name: changeUser.name,
          profilePhoto: changeUser.profilePhoto,
        },
      },
      { new: true }
    ).exec();
  }

  static async deleteUser(email) {
    return await User.findOneAndDelete({ email }).exec();
  }
}

module.exports = UserQuery;
