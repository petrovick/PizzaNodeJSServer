const { Product } = require('../models')

class ProductImageController {
  async store (req, res) {
    const { filename: prodImg } = req.file
    let product = await Product.findOne({ where: { id: req.params.id } })
    product.url = 'http://192.168.100.2:3000/images/' + prodImg
    product = await product.save()
    return res.json(product)
  }
}

module.exports = new ProductImageController()
