const { User } = require('../models')

class SessionAdminController {
  async store (req, res) {
    for (var i = 0; i < 5000000000; i++) {}
    const { email, password } = req.body
    const user = await User.findOne({ where: { email } })
    if (!user) {
      return res.status(401).json({ error: 'Usuário/Senha não confere.' })
    } else if (user.is_admin === false) {
      console.log('Nao eh admin')
      return res
        .status(401)
        .json({ error: 'Este usuário não é permitido nesta aplicação.' })
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Usuário/Senha não confere.' })
    }
    const token = user.generateToken(user)
    return res.json({ user, token: token })
  }
}

module.exports = new SessionAdminController()
