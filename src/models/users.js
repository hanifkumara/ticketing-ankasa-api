'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.users.hasOne(models.booking, {
        foreignKey: 'user_id'
      })
    }
  };
  users.init({
    fullname: DataTypes.STRING,
    photo: DataTypes.STRING,
    phone: DataTypes.STRING,
    gender: DataTypes.STRING,
    city: DataTypes.STRING,
    country: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};