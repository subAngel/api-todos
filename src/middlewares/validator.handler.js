const boom = require("@hapi/boom");

function validatorHandler(schema, property) {
	// * property puede ser body, params, query
	// closures

	/// Middleware dinamico que retorna un handler validator
	return (req, res, next) => {
		const data = req[property];
		const { error } = schema.validate(data);
		if (error) {
			next(boom.badRequest(error));
		}
		next();
	};
}

module.exports = validatorHandler;
