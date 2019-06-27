const { ProductType } = require('../models')

class ProductTypeImageController {
  async store (req, res) {
    console.log('Log Image')
    const { filename: prodImg } = req.file
    let productType = await ProductType.findOne({
      where: { id: req.params.id }
    })
    productType.url = 'http://192.168.100.10:3000/images/' + prodImg
    productType = await productType.save()
    return res.json(productType)
  }
}

module.exports = new ProductTypeImageController()
