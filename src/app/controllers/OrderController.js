const {
  Order,
  User,
  ProductTypeSizeOrder,
  ProductTypeSize,
  ProductType,
  ProductSize
} = require('../models')

const OrderMail = require('../jobs/OrderMail')
const Queue = require('../services/Queue')

class OrderController {
  async index (req, res, auth) {
    // Find the user orders
    let orders = await Order.findAll({
      include: [
        {
          model: User,
          where: { id: req.userId }
        }
      ],
      order: [['date', 'DESC']]
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

      orders[i].setDataValue('ProductTypeSizeOrders', productOrders)
    }
    return res.status(200).json(orders)
  }

  async store (req, res) {
    const {
      productTypeSizes,
      total,
      obs,
      zip,
      street,
      number,
      neighborhood
    } = req.body
    const dateNow = new Date()
    const order = await Order.create({
      total_price: total,
      user_id: req.userId,
      date: dateNow,
      obs,
      zip,
      street,
      number,
      neighborhood
    })

    // for (let i = 0; i < productTypeSizes.lenght; i++) {
    productTypeSizes.forEach(async function (item, index, array) {
      // let item = productTypeSizes[i]
      await ProductTypeSizeOrder.create({
        price: item.price,
        date: dateNow,
        product_type_size_id: item.id,
        order_id: order.id
      })
    })

    const user = await User.findOne({ where: { id: req.userId } })

    Queue.create(OrderMail.key, {
      user,
      order
    }).save()

    return res.json(order)
  }
}

module.exports = new OrderController()
