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
      type: DataTypes.STRING,
      allowNull: false,
    },
    bussiness_registration_number: {
        type: DataTypes.STRING,
        allowNull: false,
    },
   
  },
  {
    timestamps: false,
  }
);

module.exports = organizations;
