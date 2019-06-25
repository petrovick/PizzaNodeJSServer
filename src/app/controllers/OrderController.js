const {
  Order,
  User,
  ProductTypeSizeOrder,
  ProductTypeSize,
  ProductType,
  ProductSize
} = require('../models')

class ProductController {
  async index (req, res, auth) {
    // Find the user orders
    let orders = await Order.findAll({
      include: [
        {
          model: User,
          where: { id: req.userId }
        }
      ]
    })
    // Get ProductTypeSizes Object
    for (let i = 0; i < orders.length; i++) {
      var productOrders = await ProductTypeSizeOrder.findAll(
        {
          where: { order_id: orders[i].id }
        },
        {
          include: [
            {
              model: ProductTypeSize
            }
          ]
        }
      )
      console.log('Aqui 1')
      console.log(productOrders[0].ProductTypeSize)
      console.log('Aqui 2')
      orders[i].setDataValue('ProductTypeSizeOrders', productOrders)
    }
    return res.status(200).json(orders)
  }

  async store (req, res) {
    const { productTypeSizes, total } = req.body
    const dateNow = new Date()
    const order = await Order.create({
      total_price: total,
      user_id: req.userId,
      date: dateNow
    })

    productTypeSizes.map(async item => {
      await ProductTypeSizeOrder.create({
        price: item.price,
        date: dateNow,
        product_type_size_id: item.id,
        order_id: order.id
      })
    })

    return res.json(order)
  }
}

module.exports = new ProductController()
