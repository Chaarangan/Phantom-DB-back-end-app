const sequelize = require('../helpers/sequelizer');
const initModels = require('../models');
/**
 * Init database configuration
 * @return {void} 
 */
const databaseLoader = async ()=>{
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
    await initModels();
}

module.exports = databaseLoader;