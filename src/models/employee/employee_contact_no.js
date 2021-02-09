const { DataTypes } = require("sequelize");
const sequelize = require("../../helpers/sequelizer");

const employee_contact_nos = sequelize.define(
  "employee_contact_nos",
  {
    employee_id  : {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    contact_no  : {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = employee_contact_nos;
