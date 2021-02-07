const { DataTypes } = require("sequelize");
const sequelize = require("../helpers/sequelizer");
const { Sequelize } = require("../helpers/sequelizer");

const transaction_details = sequelize.define(
  "transaction_details",
  {
    transaction_id: {
      type: DataTypes.INTEGER,
      autoIncrement:true,
      primaryKey: true
    },
    account_no: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    withdraw: {
      type: DataTypes.BOOLEAN,
    },
    balance: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    detail: {
      type: DataTypes.STRING(20),
    },
    date_time: {
        type: DataTypes.DATE,
    },
    teller: {
        type: DataTypes.STRING(20),
    },
  },
  {
    timestamps: false,
  }
);

module.exports = transaction_details;
