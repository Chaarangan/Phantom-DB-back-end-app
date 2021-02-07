const sequelize = require("../../helpers/sequelizer");

const customer_logins = sequelize.define(
  "customer_logins",
  {
    customer_id : {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    username  : {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    password  : {
      type: DataTypes.STRING,
      allowNull: false,
    },
    recovery_contact_no  : {
      type: DataTypes.STRING,
      allowNull: false,
    },
    recovery_email  : {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_login  : {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = customer_logins;
