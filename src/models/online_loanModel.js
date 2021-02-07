const { DataTypes } = require("sequelize");
const sequelize = require("../helpers/sequelizer");
const { Sequelize } = require("../helpers/sequelizer");

const online_loans = sequelize.define(
  "online_loans",
  {
    loan_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    fd_no: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
  },
  {
    timestamps: false,
  }
);

module.exports = online_loans;
