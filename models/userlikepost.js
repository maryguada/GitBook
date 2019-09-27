'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserLikePost = sequelize.define('UserLikePost', {
    userId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER
  }, {});
  UserLikePost.associate = function(models) {
    // associations can be defined here
  };
  return UserLikePost;
};