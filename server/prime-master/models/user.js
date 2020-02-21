"use strict";

module.exports = (sequelize, DataTypes) => {
  var user = sequelize.define("user", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      },
      unique: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    salt: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dateOfBirth: {
      type: DataTypes.DATE,
      allowNull: false
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    position: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'nothing'
    },
    isJoin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    emailVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    emailCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    departmentFolderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'departmentFolders',
        key: 'id'
      }
    },
    companyCode: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
          model: `companies`,
          key: 'code'
      }
    },
    registrationNumber: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    },
    accountNumber: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    },
    salary: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    },
    profileImg: {
      type:DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    }
  });
  return user;
};
