const { DataTypes } = require("sequelize");
const sequelize = require("../../helpers/sequelizer");

const employees = sequelize.define(
  "employees",
  {
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING(20),
    },
    is_active: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    middle_name: {
      type: DataTypes.STRING(20),
    },
    last_name: {
      type: DataTypes.STRING(20),
    },
    address: {
      type: DataTypes.STRING(80),
    },
    nic: {
      type: DataTypes.STRING(12),
      allowNull: false,
    },
    dob: {
      type: DataTypes.DATEONLY,
    },
    gender: {
      type: DataTypes.INTEGER,
    },
    primary_contact_no: {
      type: DataTypes.STRING(10),
    },
    branch_id : {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = employees;
