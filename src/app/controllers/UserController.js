const { User } = require('../models')

class UserController {
  async store (req, res) {
    req.body.avatar = 'teste.png'
    let user = null
    if (req.userId) {
      user = await User.create({ ...req.body, is_admin: true })
    } else {
      user = await User.create({ ...req.body, is_admin: false })
    }
    return res.status(200).json(user)
  }
}

module.exports = new UserController()
