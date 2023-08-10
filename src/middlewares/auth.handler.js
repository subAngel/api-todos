const boom = require("@hapi/boom");

const { config } = require("../config/config");

function checkApiKey(req, res, next) {
	const apikey = req.headers["api"];
	if (apikey === config.apiKey) {
		next();
	} else {
		next(boom.unauthorized());
	}
}

function checkUser(req, res, next) {
	const user = req.user;
	const { id } = req.params;

	if (user.sub == id) {
		// console.log("El usuario coincide");
		next();
	} else {
		// console.log("no es valido pero bueno");
		next(boom.unauthorized());
	}
}

module.exports = { checkApiKey, checkUser };
