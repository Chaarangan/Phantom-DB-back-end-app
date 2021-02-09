const { DataTypes } = require("sequelize");
const sequelize = require("../../helpers/sequelizer");

const child_savings_accounts = sequelize.define(
  "child_savings_accounts",
  {
    account_no: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    middle_name: {
      type: DataTypes.STRING(20),
    },
    last_name: {
      type: DataTypes.STRING(20),
    },
    dob: {
      type: DataTypes.DATEONLY,
    },
    gender: {
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = child_savings_accounts;
