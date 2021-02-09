const { DataTypes } = require("sequelize");
const sequelize = require("../../helpers/sequelizer");

const savings_account_plans = sequelize.define(
  "savings_account_plans",
  {
    plan_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    account_plan: {
      type: DataTypes.STRING(10),
    },
    minimum_balance: {
      type: DataTypes.FLOAT,
    },
    interest: {
      type: DataTypes.FLOAT,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = savings_account_plans;
