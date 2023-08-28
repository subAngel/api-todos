const { Router } = require("express");
const passport = require("passport");
const { checkUser } = require("../middlewares/auth.handler");
const validatorHandler = require("../middlewares/validator.handler");
const { getUserSchema, getUserWithTask } = require("../schemas/user.schema");
const UsersService = require("../services/users.service");
const { createTaskSchema, getTaskSchema } = require("../schemas/task.schema");

const router = Router();
const service = new UsersService();

router.get(
	"/",
	passport.authenticate("jwt", { session: false }),
	async (req, res, next) => {
		try {
			const user = req.user;
			const id = user.sub;
			const info = await service.findOne(id);
			delete info.password;
			res.json(info);
		} catch (error) {
			next(error);
		}
	}
);

router.get(
	"/my-tasks",
	passport.authenticate("jwt", { session: false }),
	async (req, res, next) => {
		try {
			const user = req.user;

			const id = user.sub;
			// console.log(payload.sub === id);
			const tasks = await service.getTasksByUserId(id);
			res.json(tasks);
		} catch (error) {
			next(error);
		}
	}
);

router.get(
	"/completed-tasks",
	passport.authenticate("jwt", { session: false }),
	async (req, res, next) => {
		try {
			const user = req.user;
			const id = user.sub;
			const tasks = await service.getCompletedTasksByUser(id);

			res.json(tasks);
		} catch (error) {
			next(error);
		}
	}
);

router.post(
	"/my-tasks",
	passport.authenticate("jwt", { session: false }),
	validatorHandler(createTaskSchema, "body"),
	async (req, res, next) => {
		try {
			const user = req.user;
			const id = user.sub;
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
	"/my-tasks/:id",
	passport.authenticate("jwt", { session: false }),
	validatorHandler(getTaskSchema, "params"),
	async (req, res, next) => {
		try {
			const user = req.user;
			const idUser = user.sub;
			const { id } = req.params;
			const rta = await service.deleteTask(idUser, id);
			res.json({
				message: `Task ${id} has been deleted`,
			});
		} catch (error) {
			next(error);
		}
	}
);

router.put(
	"/my-tasks/:id",
	passport.authenticate("jwt", { session: false }),
	validatorHandler(getTaskSchema, "params"),
	async (req, res, next) => {
		try {
			const user = req.user;
			const idUser = user.sub;
			const { id } = req.params;
			const taskCompleted = await service.completeTask(idUser, id);
			res.json({
				message: "Task completed",
				task: taskCompleted,
			});
		} catch (error) {
			next(error);
		}
	}
);

router.patch(
	"/my-tasks/:id",
	passport.authenticate("jwt", { session: false }),
	validatorHandler(getTaskSchema, "params"),
	async (req, res, next) => {
		try {
			const user = req.user;
			const idUser = user.sub;
			const { id } = req.params;
			const taskBody = req.body;
			const task = await service.updateTask(idUser, id, taskBody);
			res.json({
				message: "Task updated",
				task,
			});
		} catch (error) {
			next(error);
		}
	}
);

module.exports = router;
