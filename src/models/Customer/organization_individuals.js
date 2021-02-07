const sequelize = require("../../helpers/sequelizer");

const organization_individuals = sequelize.define(
  "organization_individuals",
  {
    organization_id  : {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    individual_id : {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = organization_individuals;
