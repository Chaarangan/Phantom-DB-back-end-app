const { DataTypes } = require("sequelize");
const sequelize = require("../helpers/sequelizer");

const branches = sequelize.define(
  "branches",
  {
    branch_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    is_active: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    branch_name: {
     type: DataTypes.STRING,
    },
    location: {
        type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = branches;
