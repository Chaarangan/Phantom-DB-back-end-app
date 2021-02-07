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
      type: DataTypes.STRING,
      allowNull: false,
    },
    address_line_2 : {
      type: DataTypes.STRING,
    },
    address_line_3 : {
      type: DataTypes.STRING,
    },
    primary_email : {
      type: DataTypes.STRING,
      allowNull: false,
    },
    primary_contact_no : {
      type: DataTypes.STRING,
      allowNull: false,
    },
   
  },
  {
    timestamps: false,
  }
);

module.exports = customers;
