const Joi = require("joi");

const id = Joi.number();
const userId = Joi.number();
const title = Joi.string().min(3);
const description = Joi.string();
// const status = Joi.string().valid("COMPLETED", "PENDING");
const completed = Joi.boolean();
const dueDate = Joi.date();

const createTaskSchema = Joi.object({
	// id: id.required(),
	// userId: userId.required(),
	title: title.required(),
	description: description,
	completed: completed.required(),
	dueDate: dueDate.required(),
});

const updateTaskScheme = Joi.object({
	title,
	description,
	completed,
	dueDate,
});

const getTaskSchema = Joi.object({
	id: id.required(),
});

module.exports = {
	createTaskSchema,
	updateTaskScheme,
	getTaskSchema,
};
