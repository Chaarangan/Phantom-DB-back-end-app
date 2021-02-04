const dotenv = require('dotenv');

const result = dotenv.config();

if(result.error) throw result.error;

const config = {
    domain: process.env.HOST_DOMAIN || '127.0.0.1',
    port: process.env.PORT || '4000',

    db_name : process.env.DB_NAME,
    db_host : process.env.DB_HOST,
    db_userName : process.env.DB_USER_NAME,
    db_password : process.env.DB_PASSWORD,
    db_dialect : process.env.DB_DIALECT,

    react_url : process.env.REACT_URL,
};

module.exports = config;