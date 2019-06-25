const { ProductType } = require('../models')

class ProductTypeController {
  async index (req, res) {
    const productTypes = await ProductType.findAll({
      where: { product_id: req.params.product_id }
    })
    return res.status(200).json(productTypes)
  }

  async store (req, res) {
    const productType = await ProductType.create(req.body)
    return res.json(productType)
  }
}

module.exports = new ProductTypeController()
