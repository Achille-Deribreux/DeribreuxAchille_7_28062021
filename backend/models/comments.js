'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Comments.belongsTo(models.Users,{
        foreignKey:{
          allowNull: false
        }
      });
      models.Comments.belongsTo(models.Posts,{
        foreignKey:{
          allowNull: false
        }
      });
    }
  };
  Comments.init({
    commentid: DataTypes.INTEGER,
    postid: DataTypes.INTEGER,
    userid: DataTypes.INTEGER,
    time: DataTypes.DATE,
    content: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Comments',
  });
  return Comments;
};