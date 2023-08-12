const { Sequelize } = require("sequelize");
const { config } = require("../config/config");
const setupModels = require("../db/models");
const { uriTooLong } = require("@hapi/boom");
const debug = require("debug")("sequelize");

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`; // string interpolation

const sequelize = new Sequelize(URI, {
	dialect: "postgres",
	logging: false,
});
setupModels(sequelize);

// sequelize.sync(); // ahora es con migraciones

module.exports = sequelize;
