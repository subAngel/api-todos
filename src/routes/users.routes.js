const express = require("express");
const debug = require("debug")("user-routes");
const UsersService = require("../services/users.service");
const validatorHandler = require("../middlewares/validator.handler");
const {
	createUserSchema,
	getUserSchema,
	updateUserSchema,
} = require("../schemas/user.schema");

const router = express.Router();
const service = new UsersService();

router.get("/", async (req, res, next) => {
	try {
		const users = await service.findAll();
		res.json(users);
	} catch (error) {
		next(error);
	}
});

router.get(
	"/:id",
	validatorHandler(getUserSchema, "params"),
	async (req, res, next) => {
		try {
			const { id } = req.params;
			const user = await service.findOne(id);
			res.json(user);
		} catch (error) {
			next(error);
		}
	}
);

router.post(
	"/",
	validatorHandler(createUserSchema, "body"),
	async (req, res, next) => {
		try {
			const body = req.body;
			const newUser = await service.create(body);
			res.json({
				message: "created user",
				newUser,
			});
		} catch (error) {
			next(error);
		}
	}
);

router.patch(
	"/:id",
	validatorHandler(getUserSchema, "params"),
	validatorHandler(updateUserSchema, "body"),
	async (req, res, next) => {
		try {
			const { id } = req.params;
			const changes = req.body;
			const userModified = await service.update(id, changes);
			res.json({
				message: "updated",
				userModified,
			});
		} catch (error) {
			console.log(error);
			next(error);
		}
	}
);

router.delete(
	"/:id",
	validatorHandler(getUserSchema, "params"),
	async (req, res, next) => {
		try {
			const { id } = req.params;
			const response = await service.delete(id);
			res.json({
				message: "deleted",
				response,
			});
		} catch (error) {
			next(error);
		}
	}
);

router.get(
	"/:id/tasks",
	validatorHandler(getUserSchema, "params"),
	async (req, res, next) => {
		try {
			const { id } = req.params;
			const tasks = await service.getTasksByUserId(id);
			res.json(tasks);
		} catch (error) {
			next(error);
		}
	}
);

module.exports = router;
