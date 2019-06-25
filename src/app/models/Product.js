const sequelizePaginate = require('sequelize-paginate')

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    time: DataTypes.INTEGER,
    url: DataTypes.STRING
  })

  sequelizePaginate.paginate(Product)

  return Product
}
