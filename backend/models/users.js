'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate(models) {
      models.Users.hasMany(models.Posts);
      models.Users.hasMany(models.Comments);
    }
  };
  Users.init({
    mail: DataTypes.STRING,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    password: DataTypes.STRING,
    team: DataTypes.STRING,
    isadmin: DataTypes.BOOLEAN,
    profileurl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};