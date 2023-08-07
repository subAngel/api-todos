const boom = require("@hapi/boom");
const debug = require("debug")("user-service");
const getConnection = require("../libs/postgres");
const sequelize = require("../libs/sequelize");
class UsersService {
	constructor() {}

	async findAll() {
		// TODO
		// const users = await sequelize.q
		// return rta.rows;
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
