'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.booking.belongsTo(models.ticket, {
        foreignKey: 'ticket_id'
      }),
        models.booking.belongsTo(models.users, {
          foreignKey: 'user_id'
        })
    }
  };
  booking.init({
    user_id: DataTypes.STRING,
    ticket_id: DataTypes.INTEGER,
    status: DataTypes.STRING,
    qrcode: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'booking',
  });
  return booking;
};