"use strict";
module.exports = (sequelize, DataTypes) => {
  var company = sequelize.define("company", {
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    location_x: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    location_y: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  return company;
};
