'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  ticket.init({
    images: DataTypes.STRING,
    name_maskapai: DataTypes.STRING,
    city_departure: DataTypes.STRING,
    country_departure: DataTypes.STRING,
    city_arrived: DataTypes.STRING,
    country_arrived: DataTypes.STRING,
    ticket_type: DataTypes.STRING,
    date_departure: DataTypes.STRING,
    time_departure: DataTypes.TIME,
    date_arrived: DataTypes.STRING,
    time_arrived: DataTypes.TIME,
    child_person: DataTypes.INTEGER,
    adult_person: DataTypes.INTEGER,
    transit: DataTypes.STRING,
    class: DataTypes.STRING,
    price: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ticket',
  });
  return ticket;
};