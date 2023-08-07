const { Sequelize } = require("sequelize");
const { config } = require("../config/config");

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbHost}/${config.dbName}`; // string interpolation

const sequelize = new Sequelize(URI, {
	dialect: "postgres",
	logging: true,
});

module.exports = sequelize;
