module.exports = (sequelize, DataTypes) => {
  const ProductType = sequelize.define('ProductType', {
    name: DataTypes.STRING,
    url: DataTypes.STRING
  })

  ProductType.associate = models => {
    ProductType.belongsTo(models.Product, { foreignKey: 'product_id' })
  }

  return ProductType
}
