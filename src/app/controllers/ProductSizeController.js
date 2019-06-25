const { ProductSize, ProductTypeSize } = require('../models')

class ProductSizeController {
  async index (req, res) {
    const aaa = ProductSize
    console.log('Session: %j', aaa)
    // const productSizes = await ProductSize.findAll()

    const productSizes = await ProductSize.findAll({
      include: [
        {
          model: ProductTypeSize,
          where: { product_type_id: req.params.product_type_id }
        }
      ]
    })
    return res.status(200).json(productSizes)
    // .json({ message: "Hello, It's me" })
  }

  async store (req, res) {
    const { description, url, price, productTypeId } = req.body
    const productSize = await ProductSize.create({ description, url })

    await ProductTypeSize.create({
      product_type_id: productTypeId,
      product_size_id: productSize.id,
      price
    })

    return res.json(productSize)
  }
}

module.exports = new ProductSizeController()
