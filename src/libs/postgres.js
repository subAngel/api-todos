const { Client } = require("pg");

async function getConnection() {
	const client = new Client({
		host: "localhost",
		port: 5432,
		user: "whoangel",
		password: "whoangel",
		database: "todos_db",
	});

	await client.connect();
	return client;
}

module.exports = getConnection;
