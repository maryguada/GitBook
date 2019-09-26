'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    caption: DataTypes.STRING,
    content: DataTypes.TEXT,
    postedBy: DataTypes.STRING
  }, {});
  Post.associate = function(models) {
    // Post belongsTo User
    Post.belongsTo(models.User)
  };
  return Post;
};