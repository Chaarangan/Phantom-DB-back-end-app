const { DataTypes } = require("sequelize");
const sequelize = require("../../helpers/sequelizer");

const customer_logins = sequelize.define(
  "customer_logins",
  {
    customer_id : {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    username  : {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true,
    },
    password  : {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    recovery_contact_no  : {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    recovery_email  : {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    last_login  : {
      type: DataTypes.DATE,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = customer_logins;
