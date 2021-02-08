const { DataTypes } = require("sequelize");
const sequelize = require("../../helpers/sequelizer");
const { Sequelize } = require("../../helpers/sequelizer");

const fixed_deposits = sequelize.define(
  "fixed_deposits",
  {
    fd_no: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
    },
    account_no: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    date_opened: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    plan_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    transaction_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fd_status: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = fixed_deposits;
