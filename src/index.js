require("dotenv").config();
var debug = require("debug")("api");
const morgan = require("morgan");
const express = require("express");
const cors = require("cors");
const slash = require("express-slash");
const helmet = require("helmet");
const routerApi = require("./routes");
const {
	errorHandler,
	logErrors,
	boomErrorHandler,
	ormErrorHandler,
} = require("./middlewares/error.handler");

const app = express();

// * configuracion y middlewares
app.enable("scrict routing");
app.use(morgan("dev"));
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// * Rutas
app.get("/", (req, res) => {
	res.send("Hola mundo");
});

routerApi(app);
app.use(slash());
// * Manejadores de errores
// * middlewares de tipo error se definen antes del routing
app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

// * Iniciar el servidor
app.listen(process.env.PORT, () => {
	debug(`api is running on https://localhost:${process.env.PORT}/`);
});
