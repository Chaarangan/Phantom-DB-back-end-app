const { DataTypes } = require("sequelize");
const sequelize = require("../../helpers/sequelizer");
const { Sequelize } = require("../../helpers/sequelizer");

const checkbooks = sequelize.define(
  "checkbooks",
  {
    checkbook_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    account_no: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    is_active: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    issued_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    number_of_pages: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    starting_check_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = checkbooks;
