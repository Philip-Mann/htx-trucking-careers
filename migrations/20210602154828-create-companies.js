'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Companies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      companyName: {
        type: Sequelize.STRING
      },
      pay: {
        type: Sequelize.STRING
      },
      jobType: {
        type: Sequelize.STRING
      },
      trailerType: {
        type: Sequelize.STRING
      },
      experienceRequirement: {
        type: Sequelize.STRING
      },
      willTrain: {
        type: Sequelize.BOOLEAN
      },
      headquarters: {
        type: Sequelize.STRING
      },
      homeTime: {
        type: Sequelize.STRING
      },
      endorsements: {
        type: Sequelize.STRING
      },
      companySite: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Companies');
  }
};