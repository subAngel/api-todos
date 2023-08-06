var debug = require("debug")("api");
const morgan = require("morgan");
const express = require("express");
const routerApi = require("./routes");

const app = express();

// * configuracion y middlewares
app.use(morgan("dev"));

app.get("/", (req, res) => {
	res.send("Hola mundo");
});

routerApi(app);

app.listen(3000, () => {
	debug("api is running on https://localhost:3000/");
});
