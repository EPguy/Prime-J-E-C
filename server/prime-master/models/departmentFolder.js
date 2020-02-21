const models = require("../models");

"use strict";
module.exports = (sequelize, DataTypes) => {
  var departmentFolder = sequelize.define("departmentFolder", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fno: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    grpno: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    grpord: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    depth: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    companyCode: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: `companies`,
            key: 'code'
        }
    }
    });
  return departmentFolder;
};
