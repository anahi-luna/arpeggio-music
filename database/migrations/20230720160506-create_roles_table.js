'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('roles', {
      id: {
          type: DataType.INTEGER,
          autoIncrement: true,
          primaryKey: true,
      },
      rol: {
          type: DataType.STRING(25),
          allowNull: false,
      },
      createdAt: {
          type: DataType.DATE,
          allowNull: false,
      },
      updatedAt: {
          type: DataType.DATE,
          allowNull: false,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('roles');
  }
};
