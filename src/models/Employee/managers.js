const sequelize = require("../../helpers/sequelizer");

const managers = sequelize.define(
  "managers",
  {
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = managers;
