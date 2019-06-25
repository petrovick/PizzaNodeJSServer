const sequelizePaginate = require('sequelize-paginate')

module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    date: DataTypes.DATE,
    total_price: DataTypes.DECIMAL
  })

  Order.associate = models => {
    Order.hasMany(models.ProductTypeSizeOrder)
  }

  Order.associate = models => {
    Order.belongsTo(models.ProductTypeSize, {
      foreignKey: 'product_type_size_id'
    })
  }

  Order.associate = models => {
    Order.belongsTo(models.User, {
      foreignKey: 'user_id'
    })
  }

  sequelizePaginate.paginate(Order)

  return Order
}
