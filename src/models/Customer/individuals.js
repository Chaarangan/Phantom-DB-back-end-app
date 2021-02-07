const sequelize = require("../../helpers/sequelizer");

const individuals = sequelize.define(
  "individuals",
  {
    customer_id : {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    first_name  : {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name  : {
      type: DataTypes.STRING,
      
    },
    middle_name  : {
      type: DataTypes.STRING,
    },
    nic  : {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dob  : {
      type: DataTypes.STRING,
    },
    gender  : {
      type: DataTypes.INTEGER,
    },
    },
  {
    timestamps: false,
  }
);

module.exports = individuals;
