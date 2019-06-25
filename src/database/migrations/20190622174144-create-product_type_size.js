'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('product_type_sizes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      price: {
        allowNUll: false,
        type: Sequelize.DECIMAL
      },
      product_size_id: {
        type: Sequelize.INTEGER,
        references: { model: 'product_sizes', key: 'id' },
        onUpdate: 'CASCADE'
      },
      product_type_id: {
        type: Sequelize.INTEGER,
        references: { model: 'product_types', key: 'id' },
        onUpdate: 'CASCADE'
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
}
