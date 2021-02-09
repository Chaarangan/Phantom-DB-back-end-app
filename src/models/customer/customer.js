const { DataTypes } = require("sequelize");
const sequelize = require("../../helpers/sequelizer");

const customers = sequelize.define(
  "customers",
  {
    customer_id : {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    is_active : {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    address_line_1 : {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    address_line_2 : {
      type: DataTypes.STRING(30),
    },
    address_line_3 : {
      type: DataTypes.STRING(30),
    },
    primary_email : {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    primary_contact_no : {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
   
  },
  {
    timestamps: false,
  }
);

module.exports = customers;
