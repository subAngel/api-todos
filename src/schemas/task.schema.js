const Joi = require("joi");

const id = Joi.number();
const name = Joi.string().alphanum().min(3).max(255);
const email = Joi.string().email();
const password = Joi.string().min(6);

const createUserSchema = Joi.object({
	name: name.required(),
	email: email.required(),
	password: password.required(),
});

const updateUserSchema = Joi.object({
	id: id.required(),
	name,
	email,
	password,
});

const getUserSchema = Joi.object({
	id: id.required(),
});

module.exports = {
	createUserSchema,
	updateUserSchema,
	getUserSchema,
};
