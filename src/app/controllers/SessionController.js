const { User } = require('../models')

class SessionController {
  async store (req, res) {
    console.log('Session Request')
    const { email, password } = req.body
    const user = await User.findOne({ where: { email } })
    if (!user) {
      return res.status(401).json({ error: 'Usuário/Senha não confere.' })
    } else if (user.is_admin === true) {
      return res
        .status(401)
        .json({ error: 'Usuário admin não é permitido nesta aplicação.' })
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Usuário/Senha não confere.' })
    }
    const token = user.generateToken(user)
    return res.json({ user, token: token })
  }
}

module.exports = new SessionController()
