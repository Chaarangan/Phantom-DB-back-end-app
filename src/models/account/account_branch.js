const { DataTypes } = require("sequelize");
const sequelize = require("../../helpers/sequelizer");

const account_branches = sequelize.define(
  "account_branches",
  {
    account_no: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    branch_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = account_branches;
