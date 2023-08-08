const boom = require("@hapi/boom");
const debug = require("debug")("user-service");
const getConnection = require("../libs/postgres");
const { models } = require("../libs/sequelize");

class UsersService {
	constructor() {}

	async findAll() {
		const users = await models.User.findAll();
		return users;
	}

	async findOne(id) {
		const user = await models.User.findByPk(id);
		if (!user) {
			throw boom.notFound("User not found");
		}
		return user;
	}

	async create(data) {
		const newUser = await models.User.create(data);
		return newUser;
	}

	async delete(id) {
		const user = await this.findOne(id);
		await user.destroy();
		return { id };
	}

	async update(id, changes) {
		const user = await this.findOne(id);
		// if(!user){}
		const rta = await user.update(changes);
		return {
			id,
			rta,
		};
	}
}

module.exports = UsersService;
