const { DataTypes } = require("sequelize");
const sequelize = require("../../helpers/sequelizer");

const bank_transactions = sequelize.define(
  "bank_transactions",
  {
    transaction_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
  },
  {
    timestamps: false,
  }
);

module.exports = bank_transactions;
