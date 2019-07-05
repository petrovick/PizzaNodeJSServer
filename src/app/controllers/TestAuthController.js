class TestAuthController {
  async store (req, res) {
    return res.status(200).json({ error: 'Entrou aqui' })
  }
}

module.exports = new TestAuthController()
