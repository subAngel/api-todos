const UsersService = require("./users.service");
const boom = require("@hapi/boom");
const bcrypt = require("bcrypt");

const service = new UsersService();
class AuthService {
	async getUser(email, password) {
		const user = await service.findByEmail(email);
		if (!user) {
			throw boom.unauthorized("User not found!");
		}
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			throw boom.unauthorized("User not found!");
		}
		delete user.dataValues.password;
		return user;
	}
}

module.exports = AuthService;
