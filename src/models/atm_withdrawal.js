const { DataTypes } = require("sequelize");
const sequelize = require("../helpers/sequelizer");
const { Sequelize } = require("../helpers/sequelizer");

const atm_withdrawals = sequelize.define(
  "atm_withdrawals",
  {
    atm_transaction_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    transaction_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    atm_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = atm_withdrawals;
