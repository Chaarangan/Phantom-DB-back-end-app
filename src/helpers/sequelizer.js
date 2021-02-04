const { Sequelize } = require('sequelize');
const config = require('../config');

const sequelize = new Sequelize(config.db_name, config.db_userName, config.db_password, {
    host: config.db_host,
    dialect: config.db_dialect,
    logging:false
});

module.exports = sequelize;