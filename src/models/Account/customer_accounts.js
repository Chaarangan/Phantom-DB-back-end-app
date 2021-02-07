const sequelize = require("../../helpers/sequelizer");

const customer_accounts = sequelize.define(
  "customer_accounts",
  {
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    account_no: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = customer_accounts;
