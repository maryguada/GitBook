'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserFollowers = sequelize.define('UserFollowers', {
    userId: DataTypes.INTEGER,
    followerId: DataTypes.INTEGER
  }, {});
  UserFollowers.associate = function(models) {
    // associations can be defined here
  };
  return UserFollowers;
};