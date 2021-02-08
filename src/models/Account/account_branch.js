const { DataTypes } = require("sequelize");
const sequelize = require("../../helpers/sequelizer");
const { Sequelize } = require("../../helpers/sequelizer");

const account_branches = sequelize.define(
  "account_branches",
  {
    account_no: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    account_no: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = account_branches;
