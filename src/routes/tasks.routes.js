const { Router } = require("express");
const TasksService = require("../services/tasks.service");
const validatorHandler = require("../middlewares/validator.handler");
const {
	createTaskSchema,
	updateTaskScheme,
	getTaskSchema,
} = require("../schemas/task.schema");
const JwtStrategy = require("../utils/auth/strategies/jwt.strategy");
const passport = require("passport");
const { checkApiKey } = require("../middlewares/auth.handler");

const routesTasks = Router();
const service = new TasksService();

routesTasks.get("/", checkApiKey, async (req, res, next) => {
	try {
		const tasks = await service.findAll();
		return res.json(tasks);
	} catch (error) {
		next(error);
	}
});

routesTasks.get(
	"/:id",
	validatorHandler(getTaskSchema, "params"),
	async (req, res, next) => {
		try {
			const { id } = req.params;
			const task = await service.findOne(id);
			res.json(task);
		} catch (error) {
			next(error);
		}
	}
);

routesTasks.post(
	"/",
	passport.authenticate("jwt", { session: false }),
	validatorHandler(createTaskSchema, "body"),
	async (req, res, next) => {
		try {
			const body = req.body;
			const newTask = await service.create(body);
			res.json({
				message: "Task created successfully",
				newTask,
			});
		} catch (error) {
			next(error);
		}
	}
);

routesTasks.patch(
	"/:id",
	validatorHandler(getTaskSchema, "params"),
	async (req, res, next) => {
		try {
			const { id } = req.params;
			const body = req.body;
			const task = await service.update(id, body);
			res.json({
				message: "updated",
				task,
			});
		} catch (error) {
			next(error);
		}
	}
);

routesTasks.delete(
	"/:id",
	validatorHandler(getTaskSchema, "params"),
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

module.exports = routesTasks;
