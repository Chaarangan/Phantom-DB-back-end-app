const { DataTypes } = require("sequelize");
const sequelize = require("../helpers/sequelizer");
const { Sequelize } = require("../helpers/sequelizer");

const loan_installment_banks = sequelize.define(
  "loan_installment_banks",
  {
    installment_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primary: true,
      autoIncrement: true,
    },
    loan_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    due_date: {
      type: DataTypes.DATEONLY,
    },
    paid_date: {
      type: DataTypes.DATE,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = loan_installment_banks;
