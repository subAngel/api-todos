const { Pool } = require("pg");

const pool = new Pool({
	host: "localhost",
	port: 5432,
	user: "whoangel",
	password: "whoangel",
	database: "todos_db",
});

module.exports = pool;
