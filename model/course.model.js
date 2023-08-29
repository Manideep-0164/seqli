const { DataTypes } = require("sequelize");
const { sequelize } = require("../configs/db");

const Course = sequelize.define("courses", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = { Course };
