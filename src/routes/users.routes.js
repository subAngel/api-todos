const express = require("express");
const debug = require("debug")("user-routes");
const UsersService = require("../services/users.service");
const validatorHandler = require("../middlewares/validator.handler");
const {
	createUserSchema,
	getUserSchema,
	updateUserSchema,
	getUserWithTask,
} = require("../schemas/user.schema");
const { createTaskSchema, getTaskSchema } = require("../schemas/task.schema");
const Joi = require("joi");

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

// TASKS

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

router.get(
	"/:id/completed-tasks",
	validatorHandler(getUserSchema, "params"),
	async (req, res, next) => {
		try {
			const { id } = req.params;
			const tasks = await service.getCompletedTasksByUser(id);

			res.json(tasks);
		} catch (error) {
			next(error);
		}
	}
);

router.post(
	"/:id/tasks",
	validatorHandler(getUserSchema, "params"),
	validatorHandler(createTaskSchema, "body"),
	async (req, res, next) => {
		try {
			const { id } = req.params;
			const taskData = req.body;
			const newTask = await service.createTaskForUser(id, taskData);
			res.json({
				message: "Task created succesfull",
				task: newTask,
			});
		} catch (error) {
			next(error);
		}
	}
);

router.delete(
	"/:id/tasks/:idtask",
	validatorHandler(getUserWithTask, "params"),
	async (req, res, next) => {
		try {
			const { id, idtask } = req.params;
			const rta = await service.deleteTask(id, idtask);
			res.json({
				message: `Task ${idtask} has been deleted`,
				response: rta,
			});
		} catch (error) {
			next(error);
		}
	}
);

router.put(
	"/:id/tasks/:idtask",
	validatorHandler(getUserWithTask, "params"),
	async (req, res, next) => {
		try {
			const { id, idtask } = req.params;
			const taskCompleted = await service.completeTask(id, idtask);
			res.json({
				message: "Task completed",
				task: taskCompleted,
			});
		} catch (error) {
			next(error);
		}
	}
);

module.exports = router;
