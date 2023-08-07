const { Router } = require("express");
const TasksService = require("../services/tasks.service");
const validatorHandler = require("../middlewares/validator.handler");
const {
	createTaskSchema,
	updateTaskScheme,
	getTaskSchema,
} = require("../schemas/task.schema");

const routesTasks = Router();
const service = new TasksService();

routesTasks.get("/", async (req, res, next) => {
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

routesTasks.post("/", async (req, res, next) => {
	try {
		const body = req.body;
		const newTask = await service.create(body);
		res.json({
			message: "created user",
			newTask,
		});
	} catch (error) {
		next(error);
	}
});

routesTasks.patch("/:id", async (req, res, next) => {
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
});

routesTasks.delete("/:id", async (req, res, next) => {
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
});

module.exports = routesTasks;
