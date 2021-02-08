const { DataTypes } = require("sequelize");
const sequelize = require("../../helpers/sequelizer");

const bank_visit_loans = sequelize.define(
  "bank_visit_loans",
  {
    loan_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    approved_date: {
      type: DataTypes.DATE,
    },
    approved_by: {
        type: DataTypes.INTEGER,
    },
    requested_by: {
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = bank_visit_loans;
