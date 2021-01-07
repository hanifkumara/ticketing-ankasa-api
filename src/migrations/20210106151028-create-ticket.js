'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tickets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      images: {
        type: Sequelize.STRING
      },
      name_maskapai: {
        type: Sequelize.STRING
      },
      city_departure: {
        type: Sequelize.STRING
      },
      country_departure: {
        type: Sequelize.STRING
      },
      city_arrived: {
        type: Sequelize.STRING
      },
      country_arrived: {
        type: Sequelize.STRING
      },
      ticket_type: {
        type: Sequelize.STRING
      },
      date_departure: {
        type: Sequelize.STRING
      },
      time_departure: {
        type: Sequelize.TIME
      },
      date_arrived: {
        type: Sequelize.STRING
      },
      time_arrived: {
        type: Sequelize.TIME
      },
      child_person: {
        type: Sequelize.INTEGER
      },
      adult_person: {
        type: Sequelize.INTEGER
      },
      transit: {
        type: Sequelize.STRING
      },
      class: {
        type: Sequelize.STRING
      },
      price: {
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
    await queryInterface.dropTable('tickets');
  }
};