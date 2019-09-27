'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    githubId: DataTypes.INTEGER,
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Name is required"
        }
      },
    },
    username: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Username is required"
        }
      },
    },
    password: {
      type: DataTypes.STRING,
      validate:{
          len: {
            args: [8, 100],
            msg: "Password must be at least 8 characters"
          }
      },
    }
  }, {});
  User.associate = function (models) {
    // User hasMany Posts
    User.hasMany(models.Post, {as: 'posts'})
    User.belongsToMany(models.User, {
      through: 'UserFollowers',
      as: 'followers',
      foreignKey: 'userId',
    })
    User.belongsToMany(models.User, {
      through: 'UserFollowers',
      as: 'following',
      foreignKey: 'followerId',
    })
  };
  return User;
};