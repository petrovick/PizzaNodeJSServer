const { ProductSize, ProductTypeSize } = require('../models')

class ProductSizeController {
  async index (req, res) {
    const aaa = ProductSize
    console.log('Session: %j', aaa)
    // const productSizes = await ProductSize.findAll()

    const productSizes = await ProductTypeSize.findAll(
      {
        where: { product_type_id: req.params.product_type_id }
      },
      {
        include: [
          {
            model: ProductSize,
            required: true
          }
        ]
      }
    )

    for (let i = 0; i < productSizes.length; i++) {
      const productSize = await ProductSize.findOne({
        where: { id: productSizes[i].product_size_id }
      })
      productSizes[i].setDataValue('ProductSize', productSize)
    }

    return res.status(200).json(productSizes)
  }

  async store (req, res) {
    const { description, url, price } = req.body
    const productSize = await ProductSize.create({ description, url })

    await ProductTypeSize.create({
      product_type_id: req.params.product_type_id,
      product_size_id: productSize.id,
      price
    })

    return res.json(productSize)
  }
}

module.exports = new ProductSizeController()
