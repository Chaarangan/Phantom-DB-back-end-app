const { DataTypes } = require("sequelize");
const sequelize = require("../../helpers/sequelizer");
const { Sequelize } = require("../../helpers/sequelizer");

const individuals = sequelize.define(
  "individuals",
  {
    customer_id : {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    first_name  : {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    last_name  : {
      type: DataTypes.STRING(20),
      
    },
    middle_name  : {
      type: DataTypes.STRING(20),
    },
    nic  : {
      type: DataTypes.STRING(12),
      allowNull: false,
    },
    dob  : {
      type: DataTypes.DATEONLY,
    },
    gender  : {
      type: DataTypes.INTEGER,
    },
    },
  {
    timestamps: false,
  }
);

module.exports = individuals;
