const sequelize = require("../../helpers/sequelizer");

const branches = sequelize.define(
  "branches",
  {
    branch_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    is_active: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    branch_name: {
     type: DataTypes.STRING,
     allowNull: false,
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
  },
  {
    timestamps: false,
  }
);

module.exports = branches;
