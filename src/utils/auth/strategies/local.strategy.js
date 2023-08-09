const { Strategy } = require("passport-local");
const UsersService = require("../../../services/users.service");
const boom = require("@hapi/boom");
const bcrypt = require("bcrypt");

const service = new UsersService();

const LocalStrategy = new Strategy(
	{
		// usernameField: "email", // personalizar el login
		usernameField: "username",
		passwordField: "password",
	},
	async (username, password, done) => {
		try {
			const user = await service.findByUsername(username);
			if (!user) {
				// si no se encuentra el usuario buscado
				return done(boom.unauthorized(), false);
			}
			const isMatch = await bcrypt.compare(password, user.password);
			if (!isMatch) {
				// si la contrase;a no coincide
				return done(boom.unauthorized("Password incorrect"), false);
			}
			delete user.dataValues.password;
			done(null, user);
		} catch (error) {
			done(error, false);
		}
	}
);

module.exports = LocalStrategy;
