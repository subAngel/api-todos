const { Router } = require("express");
const passport = require("passport");

const authRouter = Router();

authRouter.post(
	"/login",
	passport.authenticate("local", { session: false }),
	async (req, res, next) => {
		try {
			res.json(req.user);
		} catch (error) {
			next(error);
		}
	}
);

module.exports = authRouter;
