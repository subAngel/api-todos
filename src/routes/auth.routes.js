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
				name: user.fullname,
			};

			const token = jwt.sign(payload, config.secretKey);
			res.cookie("token", token, { httpOnly: true });
			res.json({ user, token });
		} catch (error) {
			next(error);
		}
	}
);

authRouter.post("/recovery", async (req, res, next) => {
	try {
		const { email } = req.body;
	} catch (error) {
		next(error);
	}
});

module.exports = authRouter;
