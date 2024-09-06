const UserQuery = require("../query/userQuery");
const { isBodyValid } = require("../middlewares/userValidator");

class UserController {
  static async getAllusers(req, res, next) {
    let allUser = await UserQuery.getAllusers();
    res.status(200).send(allUser);
  }

  static getUserData = async (req, res, next) => {
    const user = await UserQuery.getUsers(req.user.email);
    res.status(200).send(user);
  };

  static async updateUser(req, res) {
    if (!isBodyValid(req, res)) return;
    const user = req.user;
    const changeUser = req.body;
    const updatedUser = await UserQuery.updateUser(user, changeUser);
    res.status(200).json(updatedUser);
  }

  static async deleteUser(req, res) {
    const user = req.user;
    UserQuery.deleteUser(user.email);
    res.status(200).json({ message: `User ${user.email} berhasil dihapus` });
  }
}

module.exports = UserController;
