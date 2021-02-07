const sequelize = require("../../helpers/sequelizer");

const customer_contact_nos = sequelize.define(
  "customer_contact_nos",
  {
    customer_id : {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    contact_no  : {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = customer_contact_nos;
