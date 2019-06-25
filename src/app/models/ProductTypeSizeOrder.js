module.exports = (sequelize, DataTypes) => {
  const ProductTypeSize = sequelize.define('ProductTypeSizeOrder', {
    price: DataTypes.DECIMAL,
    date: DataTypes.DATE
  })

  ProductTypeSize.associate = models => {
    ProductTypeSize.belongsTo(models.ProductTypeSize, {
      foreignKey: 'product_type_size_id'
    })
    ProductTypeSize.belongsTo(models.Order, {
      foreignKey: 'order_id'
    })
  }

  return ProductTypeSize
}
