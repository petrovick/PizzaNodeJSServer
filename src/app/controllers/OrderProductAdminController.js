const {
  Order,
  User,
  ProductTypeSizeOrder,
  ProductTypeSize,
  ProductType
} = require('../models')

const Sequelize = require('sequelize')
const config = require('../../config/database') // [env]

class OrderProductAdminController {
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
      'product_sizes.description as product_sizes_description, ' +
      'products.time as product_time, ' +
      'orders.obs order_obs, ' +
      'product_type_sizes.id as product_type_sizes_id' +
      'from public.orders as orders ' +
      '  join public.product_type_size_orders as product_type_size_orders on orders.id = product_type_size_orders.order_id ' +
      '  join public.product_type_sizes as product_type_sizes on product_type_sizes.id = product_type_size_orders.product_type_size_id ' +
      '  join public.product_types as product_types on product_types.id = product_type_sizes.product_type_id ' +
      '  join public.product_sizes as product_sizes on product_sizes.id = product_type_sizes.product_size_id ' +
      '  join public.products as products on products.id = product_types.product_id ' +
      '  join public.users as users on users.id = orders.user_id ' +
      'where orders.id = ' +
      req.params.id

    let orderProds = await sequelize.query(query)
    let data = orderProds[0]
    return res.status(200).json(data)
  }
}

module.exports = new OrderProductAdminController()
