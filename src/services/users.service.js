const boom = require("@hapi/boom");
const debug = require("debug")("user-service");
// const getConnection = require("../libs/postgres");
const pool = require("../libs/postgres.pool");

class UsersService {
	constructor() {
		this.pool = pool;

		this.pool.on("error", (err) => debug(err));
	}

	async findAll() {
		const client = await getConnection();
		const rta = await client.query("select * from users;");
		return rta.rows;
	}

	async findOne(id) {
		const user = this.users[id];
		if (!user) {
			throw boom.notFound("User not found");
		}
		return user;
	}

	async create(data) {
		return data;
	}

	async delete(id) {
		const userdeleted = await this.findOne(id);
		return userdeleted;
	}

	async update(id, body) {
		const user = await this.findOne(id);
		// TODO actualizar usuarios
		return user;
	}
}

module.exports = UsersService;
