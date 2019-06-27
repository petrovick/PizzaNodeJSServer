const { ProductSize } = require('../models')

class ProductSizeImageController {
  async store (req, res) {
    const { filename: prodImg } = req.file
    let productSize = await ProductSize.findOne({
      where: { id: req.params.id }
    })
    productSize.url = 'http://192.168.100.10:3000/images/' + prodImg
    productSize = await productSize.save()
    return res.json(productSize)
  }
}

module.exports = new ProductSizeImageController()
