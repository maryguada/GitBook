'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    commented_by: DataTypes.STRING,
    comment: DataTypes.STRING
  }, {});
  Comment.associate = function(models) {
    // Comment belongsTo Post
    Comment.belongsTo(models.Post)
  };
  return Comment;
};