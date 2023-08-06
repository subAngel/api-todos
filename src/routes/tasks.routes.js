const { Router } = require("express");
const TasksService = require("../services/tasks.service");

const routesTasks = Router();
const service = new TasksService();

routesTasks.get("/", async (req, res) => {
	const tasks = await service.findAll();
	return res.json(tasks);
});

routesTasks.post("/", async (req, res) => {
	const body = req.body;
	const newTask = await service.create(body);
	res.json({
		message: "created user",
		newTask,
	});
});

routesTasks.patch("/:id", async (req, res) => {
	const { id } = req.params;
	const body = req.body;
	const task = await service.update(id, body);
	res.json({
		message: "updated",
		task,
	});
});

routesTasks.delete("/:id", async (req, res) => {
	const { id } = req.params;
	const response = await service.delete(id);
	res.json({
		message: "deleted",
		response,
	});
});

module.exports = routesTasks;
