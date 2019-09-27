'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    caption: DataTypes.STRING,
    content: DataTypes.TEXT,
    postedBy: DataTypes.STRING
  }, {});
  Post.associate = function(models) {
    // Post belongsTo User
    // Post hasMany Comment
    Post.belongsTo(models.User)
    Post.belongsToMany(models.User, {
      through: 'UserLikePost',
      as: 'likes',
      foreignKey: 'postId',
    })
    Post.hasMany(models.Comment, {as: 'comments'})
  };
  return Post;
};