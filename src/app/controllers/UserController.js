const { User } = require('../models')

class UserController {
  async store (req, res) {
    req.body.avatar = 'teste.png'
    var user = await User.create(req.body)
    return res.status(200).json(user)
  }
}

module.exports = new UserController()
