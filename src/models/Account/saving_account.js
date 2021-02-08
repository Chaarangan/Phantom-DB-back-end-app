const { DataTypes } = require("sequelize");
const sequelize = require("../../helpers/sequelizer");
const { Sequelize } = require("../../helpers/sequelizer");

const savings_accounts = sequelize.define(
  "savings_accounts",
  {
    account_no: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
    },
    number_of_withdrawals: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    account_plan_id: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = savings_accounts;
