const Joi = require("joi");

const id = Joi.number();
const user_id = Joi.number();
const title = Joi.string().min(3);
const description = Joi.string();
const status = Joi.string().valid("COMPLETED", "PENDING");
const due_date = Joi.date();

const createTaskSchema = Joi.object({
	id: id.required(),
	user_id: user_id.required(),
	title: title.required(),
	description: description,
	status: status.required(),
	due_date: due_date.required(),
});

const updateTaskScheme = Joi.object({
	title,
	description,
	status,
	due_date,
});

const getTaskSchema = Joi.object({
	id: id.required(),
});

module.exports = {
	createTaskSchema,
	updateTaskScheme,
	getTaskSchema,
};
