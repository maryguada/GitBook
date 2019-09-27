'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    caption: DataTypes.STRING,
    content: DataTypes.TEXT,
    postedBy: DataTypes.STRING,
    tag1: DataTypes.STRING,
    tag2: DataTypes.STRING,
    tag3: DataTypes.STRING,
  }, {});
  Post.associate = function(models) {
    // Post belongsTo User
    Post.belongsTo(models.User)
  };
  return Post;
};