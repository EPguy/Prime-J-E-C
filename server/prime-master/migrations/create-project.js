/*"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("projects", {
      project_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      body: {
        type: Sequelize.TEXT("long")
      },
      category1: {
        type: Sequelize.STRING
      },
      category2: {
        type: Sequelize.STRING
      },
      deadline: {
        type: Sequelize.STRING
      },
      supports: {
        type: Sequelize.INTEGER,
        defultValue: 0,
        allowNull: false
      },
      location: {
        type: Sequelize.STRING
      },
      level: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      tags: {
        type: Sequelize.STRING
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("projects");
  }
};
*/