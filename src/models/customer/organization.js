const { DataTypes } = require("sequelize");
const sequelize = require("../../helpers/sequelizer");

const organizations = sequelize.define(
  "organizations",
  {
    customer_id : {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    bussiness_registration_number: {
      type: DataTypes.STRING(20),
    },
  },
  {
    timestamps: false,
  }
);

module.exports = organizations;
