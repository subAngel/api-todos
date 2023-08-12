const { Router } = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { config } = require("../config/config");
const AuthService = require("../services/auth.service");
const authRouter = Router();
const { recoveryPassword } = require("../schemas/user.schema");
const validatorHander = require("../middlewares/validator.handler");

const service = new AuthService();

authRouter.post(
	"/login",
	passport.authenticate("local", { session: false }),
	async (req, res, next) => {
		try {
			const user = req.user;
			const data = service.signToken(user);
			res.cookie("token", data.token, { httpOnly: true });
			res.json(data);
		} catch (error) {
			next(error);
		}
	}
);

authRouter.post("/recovery", async (req, res, next) => {
	try {
		const { email } = req.body;
		const rta = await service.sendRecovery(email);
		res.json(rta);
	} catch (error) {
		next(error);
	}
});

authRouter.post(
	"/change-password",
	validatorHander(recoveryPassword, "body"),
	async (req, res, next) => {
		try {
			const { token, password } = req.body;
			const rta = await service.changePassword(token, password);
			res.json(rta);
		} catch (error) {
			next(error);
		}
	}
);

module.exports = authRouter;
