class TestAuthController {
  async store (req, res) {
    return res.status(200).json({ message: 'Entrou aqui' })
  }
}

module.exports = new TestAuthController()
