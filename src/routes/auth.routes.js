const { Router } = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { config } = require("../config/config");
const authRouter = Router();

authRouter.post(
	"/login",
	passport.authenticate("local", { session: false }),
	async (req, res, next) => {
		try {
			const user = req.user;
			const payload = {
				sub: user.id,
				user: {
					id: user.id,
					fullname: user.fullname,
					username: user.username,
				},
			};

			const token = jwt.sign(payload, config.secretKey);
			res.json({ user, token });
		} catch (error) {
			next(error);
		}
	}
);

module.exports = authRouter;
