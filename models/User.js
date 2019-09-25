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
    // associations can be defined here
  };
  return User;
};