const { DataTypes } = require("sequelize");
const sequelize = require("../../helpers/sequelizer");
const { Sequelize } = require("../../helpers/sequelizer");

const loans = sequelize.define(
  "loans",
  {
    loan_id: {
      type: DataTypes.INTEGER,
      autoIncrement:true,
      primaryKey: true
    },
    account_no: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    loan_type: {
        type: DataTypes.INTEGER,
    },
    amount: {
      type: DataTypes.FLOAT,
    },
    branch_id: {
      type: DataTypes.INTEGER,
    },
    date: {
        type: DataTypes.DATE,
    },
    time_period: {
      type: DataTypes.INTEGER,
    },
    installment: {
      type: DataTypes.FLOAT,
    },
    loan_status: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = loans;
