const {
  Order,
  User,
  ProductTypeSizeOrder,
  ProductTypeSize,
  ProductType
} = require('../models')

const Sequelize = require('sequelize')
const config = require('../../config/database') // [env]

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
              model: 'product_type_size_id'
            }
          ]
        }
      )

      for (let j = 0; j < productOrders.length; j++) {
        var productTypeSizes = await ProductTypeSize.findAll(
          {
            where: { id: productOrders[j].product_type_size_id }
          },
          {
            include: [
              {
                model: ProductType
              }
            ]
          }
        )
        productOrders[j].setDataValue('ProductTypeSizes', productTypeSizes)
      }
      orders[i].setDataValue('ProductTypeSizeOrders', productOrders)
    }
    return res.status(200).json(orders)
  }
}

module.exports = new OrderAdminController()
