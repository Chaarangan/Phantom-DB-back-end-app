const { DataTypes } = require("sequelize");
const sequelize = require("../../helpers/sequelizer");

const checking_accounts = sequelize.define(
  "checking_accounts",
  {
    account_no: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primary: true,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = checking_accounts;
