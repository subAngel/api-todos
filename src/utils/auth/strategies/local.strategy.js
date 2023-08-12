const { Strategy } = require("passport-local");
const boom = require("@hapi/boom");
const bcrypt = require("bcrypt");
const AuthService = require("../../../services/auth.service");
const UsersService = require("../../../services/users.service");

const service = new UsersService();
const authservice = new AuthService();

const LocalStrategy = new Strategy(
	{
		// usernameField: "email", // personalizar el login
		usernameField: "email",
		passwordField: "password",
	},
	async (email, password, done) => {
		try {
			const userWEmail = await authservice.getUser(email, password);

			done(null, userWEmail);
		} catch (error) {
			done(error, false);
		}
	}
);

module.exports = LocalStrategy;
