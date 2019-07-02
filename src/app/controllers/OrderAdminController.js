const moment = require('moment')
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
    const sequelize = new Sequelize(
      config.database,
      config.username,
      config.password,
      config
    )

    var query =
      'select  ' +
      'orders.id as order_id,  ' +
      'users.name as user_name,  ' +
      'product_type_size_orders.date as order_date,  ' +
      'product_type_size_orders.price as order_price, ' +
      'products.name as product_name, ' +
      'product_types.name as product_type_name, ' +
      'product_types.url as product_type_url, ' +
      'product_sizes.description as product_sizes_description, ' +
      'products.time as product_time, ' +
      'orders.obs order_obs ' +
      'from public.orders as orders ' +
      '  join public.product_type_size_orders as product_type_size_orders on orders.id = product_type_size_orders.order_id ' +
      '  join public.product_type_sizes as product_type_sizes on product_type_sizes.id = product_type_size_orders.product_type_size_id ' +
      '  join public.product_types as product_types on product_types.id = product_type_sizes.product_type_id ' +
      '  join public.product_sizes as product_sizes on product_sizes.id = product_type_sizes.product_size_id ' +
      '  join public.products as products on products.id = product_types.product_id ' +
      '  join public.users as users on users.id = orders.user_id'

    let orders = await sequelize.query(query)

    var dataOrdersOrganized = []
    let lastOrderId = 0
    let lastOrderIndex = -1

    for (let i = 0; i < orders[0].length; i++) {
      console.log('orders[0][i].order_date')
      console.log(orders[0][i].order_date)
      if (lastOrderId === orders[0][i].order_id) {
        dataOrdersOrganized[lastOrderIndex].productDetails.push({
          product_name: orders[0][i].product_name,
          product_type_name: orders[0][i].product_type_name,
          product_sizes_description: orders[0][i].product_sizes_description,
          product_time: orders[0][i].product_time,
          product_type_url: orders[0][i].product_type_url
        })
      } else {
        lastOrderId = orders[0][i].order_id
        dataOrdersOrganized.push({
          order_id: orders[0][i].order_id,
          user_name: orders[0][i].user_name,
          order_obs: orders[0][i].order_obs,
          order_date: moment(orders[0][i].order_date).fromNow(),
          order_price: orders[0][i].order_price,
          productDetails: [
            {
              product_name: orders[0][i].product_name,
              product_type_name: orders[0][i].product_type_name,
              product_sizes_description: orders[0][i].product_sizes_description,
              product_time: orders[0][i].product_time,
              product_type_url: orders[0][i].product_type_url
            }
          ]
        })
        lastOrderIndex += 1
      }
    }

    console.log(dataOrdersOrganized)

    return res.status(200).json(dataOrdersOrganized)
  }
}

module.exports = new OrderAdminController()
