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
      models.Posts.hasMany(models.Comments);
      models.Posts.belongsTo(models.Users,{
        foreignKey:{
          allowNull: false
        },
        onDelete: 'CASCADE'
      })
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