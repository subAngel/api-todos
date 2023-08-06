const { Router } = require("express");

const routesTasks = Router();

routesTasks.get("/", (req, res) => {
	return res.send("aqui van las tareas");
});

router.post("/", (req, res) => {
	const body = req.body;
	res.json({
		message: "created user",
		data: body,
	});
});

router.patch("/:id", (req, res) => {
	const { id } = req.params;
	const body = req.body;
	res.json({
		message: "updated",
		data: body,
		id,
	});
});

router.delete("/:id", (req, res) => {
	const { id } = req.params;
	res.json({
		message: "deleted",
		id,
	});
});

module.exports = routesTasks;
