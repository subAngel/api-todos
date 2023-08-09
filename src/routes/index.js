const express = require("express");
const usersRouter = require("./users.routes");
const tasksRouter = require("./tasks.routes");
const authRouter = require("./auth.routes");

function routesApi(app) {
	const router = express.Router({
		caseSensitive: app.get("case sensitive routing"),
		strict: app.get("strict routing"),
	});
	app.use("/api", router);
	router.use("/users", usersRouter);
	router.use("/tasks", tasksRouter);
	router.use("/auth", authRouter);
}

module.exports = routesApi;
