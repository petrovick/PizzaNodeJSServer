const { ProductSize, ProductTypeSize } = require('../models')

class ProductSizeController {
  async index (req, res) {
    // const productTypeSizes = await ProductTypeSize.findAll()

    const productTypeSizes = await ProductTypeSize.findAll(
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

    for (let i = 0; i < productTypeSizes.length; i++) {
      const productSize = await ProductSize.findOne({
        where: { id: productTypeSizes[i].product_size_id }
      })
      productTypeSizes[i].setDataValue('ProductSize', productSize)
    }
    console.log(productTypeSizes)

    return res.status(200).json(productTypeSizes)
  }

  async store (req, res) {
    const { description, url, price, product_type_id } = req.body

    const productSize = await ProductSize.create({ description, url })

    await ProductTypeSize.create({
      product_type_id: product_type_id,
      product_size_id: productSize.id,
      price
    })

    return res.json(productSize)
  }
}

module.exports = new ProductSizeController()
