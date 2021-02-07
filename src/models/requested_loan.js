const { DataTypes } = require("sequelize");
const sequelize = require("../helpers/sequelizer");
const { Sequelize } = require("../helpers/sequelizer");

const requested_loans = sequelize.define(
  "requested_loans",
  {
    request_id: {
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
    branch_id: {
      type: DataTypes.INTEGER,
      allowNull:false,
    },
    time_period: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    installment: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    requested_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    requested_by: {
        type: DataTypes.INTEGER,
    },
    requested_loan_status: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = requested_loans;
