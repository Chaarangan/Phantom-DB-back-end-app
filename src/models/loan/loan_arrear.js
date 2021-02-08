const {DataTypes} = require("sequelize");
const sequelize = require("../../helpers/sequelizer");

const loan_arrears = sequelize.define(
  "loan_arrears",
  {
    loan_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    due_date: {
      type: DataTypes.DATEONLY,
    },
    arrear_status: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  },
  {
    timestamps: false,
  }
);

module.exports = loan_arrears;
