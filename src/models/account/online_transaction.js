const { DataTypes } = require("sequelize");
const sequelize = require("../../helpers/sequelizer");

const online_transactions = sequelize.define(
  "online_transactions",
  {
    online_transaction_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    withdrawal_id: {
      type: DataTypes.INTEGER,
    },
    deposit_id: {
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = online_transactions;
