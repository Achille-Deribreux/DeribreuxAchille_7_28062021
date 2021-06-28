'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Posts extends Model {
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
        }
      })
    }
  };
  Posts.init({
    postid: DataTypes.INTEGER,
    userid: DataTypes.INTEGER,
    time: DataTypes.DATE,
    content: DataTypes.TEXT,
    userliked: DataTypes.TEXT,
    likes: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Posts',
  });
  return Posts;
};