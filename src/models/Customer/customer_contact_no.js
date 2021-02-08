const { DataTypes } = require("sequelize");
const sequelize = require("../../helpers/sequelizer");
const { Sequelize } = require("../../helpers/sequelizer");

const customer_contact_nos = sequelize.define(
  "customer_contact_nos",
  {
    customer_id : {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    contact_no  : {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = customer_contact_nos;
