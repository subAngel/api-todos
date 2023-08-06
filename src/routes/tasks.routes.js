const { Router } = require("express");
const TasksService = require("../services/tasks.service");

const routesTasks = Router();
const service = new TasksService();

routesTasks.get("/", async (req, res) => {
	try {
		const tasks = await service.findAll();
		return res.json(tasks);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
});

routesTasks.get("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const task = service.findOne(id);
		res.json(task);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
});

routesTasks.post("/", async (req, res) => {
	try {
		const body = req.body;
		const newTask = await service.create(body);
		res.json({
			message: "created user",
			newTask,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

routesTasks.patch("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const body = req.body;
		const task = await service.update(id, body);
		res.json({
			message: "updated",
			task,
		});
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
});

routesTasks.delete("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const response = await service.delete(id);
		res.json({
			message: "deleted",
			response,
		});
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
});

module.exports = routesTasks;
