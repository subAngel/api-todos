const { Router } = require("express");

const routesTasks = Router();

routesTasks.get("/", (req, res) => {
	return res.send("aqui van las tareas");
});

module.exports = routesTasks;
