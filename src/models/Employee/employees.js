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
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_active: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    middle_name: {
      type: DataTypes.STRING,
    },
    last_name: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
    nic: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dob: {
      type: DataTypes.STRING,
    },
    gender: {
      type: DataTypes.INTEGER,
    },
    primary_contact_no: {
      type: DataTypes.STRING,
    },
    branch_id : {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = employees;
