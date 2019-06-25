module.exports = (sequelize, DataTypes) => {
  const ProductSize = sequelize.define('ProductSize', {
    description: DataTypes.STRING,
    url: DataTypes.STRING
  })

  ProductSize.associate = models => {
    ProductSize.hasMany(models.ProductTypeSize, { foreignKey: 'id' })
  }

  return ProductSize
}
