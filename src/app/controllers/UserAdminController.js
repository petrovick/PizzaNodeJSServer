const { User } = require("../models");

class UserAdminController {
  async store(req, res) {
    req.body.avatar = "avatarhere";
    if (req.isAdmin) {
      var user = await User.create({ ...req.body, is_admin: true });
      return res.status(200).json(user);
    }
    return res.status(401);
  }
}

module.exports = new UserAdminController();
