const {
  Order,
  User,
  ProductTypeSizeOrder,
  ProductTypeSize
} = require('../models')

class OrderAdminController {
  async index (req, res, auth) {
    // Find the user orders
    let orders = await Order.findAll({
      /* include: [
        {
          model: User,
          where: { id: req.userId }
        }
      ] */
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
}

module.exports = new OrderAdminController()
