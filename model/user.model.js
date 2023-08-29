const { DataTypes } = require("sequelize");
const { sequelize } = require("../configs/db");
const { Course } = require("./course.model");

const Student = sequelize.define("students", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dob: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  major: {
    type: DataTypes.ENUM,
    allowNull: false,
    values: ["Computer Science", "Engineering", "Mathematics", "Physics"],
  },
  gender: {
    type: DataTypes.ENUM,
    allowNull: false,
    values: ["Male", "Female"],
  },
  contact_number: {
    type: DataTypes.STRING(15),
    allowNull: false, // This maps to the Django field name
  },
  courseID: {
    type: DataTypes.INTEGER,
    references: {
      model: Course,
      key: "id",
    },
  },
});

Student.belongsTo(sequelize.models.courses, {
  foreignKey: "courseID",
});

module.exports = { Student };
