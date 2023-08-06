const { Router } = require("express");
const TasksService = require("../services/tasks.service");

const routesTasks = Router();
const service = new TasksService();

routesTasks.get("/", (req, res) => {
	const tasks = service.findAll();
	return res.json(tasks);
});

routesTasks.post("/", (req, res) => {
	const body = req.body;
	const newTask = service.create(body);
	res.json({
		message: "created user",
		newTask,
	});
});

routesTasks.patch("/:id", (req, res) => {
	const { id } = req.params;
	const body = req.body;
	const task = service.update(id, body);
	res.json({
		message: "updated",
		task,
	});
});

routesTasks.delete("/:id", (req, res) => {
	const { id } = req.params;
	const response = service.delete(id);
	res.json({
		message: "deleted",
		response,
	});
});

module.exports = routesTasks;
