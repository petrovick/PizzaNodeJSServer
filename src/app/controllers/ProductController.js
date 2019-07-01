const { Product } = require('../models')

class ProductController {
  async index (req, res) {
    const options = {
      // attributes: ['id', 'name'],
      page: req.query.page || 1, // Default 1
      paginate: req.query.paginate || 25, // Default 25
      order: [['name', 'ASC']]
      // where: { name: { [Op.like]: `%elliot%` } }
    }

    const { docs: products, pages, total } = await Product.paginate(options)
    return res.status(200).json({ products, pages, total })
  }

  async store (req, res) {
    req.body.url = 'Empty Image'

    const product = await Product.create(req.body)
    return res.json(product)
  }
}

module.exports = new ProductController()
