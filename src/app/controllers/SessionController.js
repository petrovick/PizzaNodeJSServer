const { User } = require('../models')

class SessionController {
  async store (req, res) {
    console.log('Session Request')
    const { email, password } = req.body
    const user = await User.findOne({ where: { email } })

    if (!user) {
      console.log('Usuário não encontrado.')
    }

    if (!(await user.checkPassword(password))) {
      console.log('Senha incorreta')
    }
    console.log('before token')
    const token = user.generateToken(user)
    console.log('token')
    console.log(token)
    return res.json({ user, token: token })
  }
}

module.exports = new SessionController()
