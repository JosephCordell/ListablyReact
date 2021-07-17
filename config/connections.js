const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.REACT_APP_JAWSDB_URL) {
    sequelize = new Sequelize(process.env.REACT_APP_JAWSDB_URL);
} else {
    sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306,
        password: 'password'
    });
}

module.exports = sequelize;
