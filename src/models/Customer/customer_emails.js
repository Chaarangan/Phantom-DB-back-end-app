const sequelize = require("../../helpers/sequelizer");

const customer_emails = sequelize.define(
  "customer_emails",
  {
    customer_id : {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    email  : {
      type: DataTypes.STRING,
      allowNull: false,
    },
   
  },
  {
    timestamps: false,
  }
);

module.exports = customer_emails;
