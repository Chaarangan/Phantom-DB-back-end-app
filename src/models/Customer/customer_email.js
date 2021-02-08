const { DataTypes } = require("sequelize");
const sequelize = require("../../helpers/sequelizer");
const { Sequelize } = require("../../helpers/sequelizer");

const customer_emails = sequelize.define(
  "customer_emails",
  {
    customer_id : {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    email  : {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
   
  },
  {
    timestamps: false,
  }
);

module.exports = customer_emails;
