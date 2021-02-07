const { DataTypes } = require("sequelize");
const sequelize = require("../helpers/sequelizer");
const { Sequelize } = require("../helpers/sequelizer");

const fixed_deposit_plans = sequelize.define(
  "fixed_deposit_plans",
  {
    plan_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    time_period: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    interest: {
      type: DataTypes.FLOAT,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = fixed_deposit_plans;
