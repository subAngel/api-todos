const usersRouter = require("./users.routes");

function routesApi(app) {
	app.use("/users", usersRouter);
}

module.exports = routesApi;
