const { DataTypes } = require("sequelize");
const sequelize = require("../../helpers/sequelizer");

const loan_types = sequelize.define(
  "loan_types",
  {
    type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    type_name: {
      type: DataTypes.STRING(15),
    },
    interest_rate: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = loan_types;
