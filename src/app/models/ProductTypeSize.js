module.exports = (sequelize, DataTypes) => {
  const ProductTypeSize = sequelize.define('ProductTypeSize', {
    price: DataTypes.DECIMAL
  })

  ProductTypeSize.associate = models => {
    ProductTypeSize.belongsTo(models.ProductType, {
      foreignKey: 'product_type_id'
    })
    ProductTypeSize.belongsTo(models.ProductSize, {
      foreignKey: 'product_size_id'
    })
  }

  return ProductTypeSize
}
