const Joi = require("joi");

const id = Joi.number();
const fullname = Joi.string().min(3).max(255);
const username = Joi.string().alphanum().min(3).max(25);
const imageProfile = Joi.string().uri();
const email = Joi.string().email();
const password = Joi.string().min(6);

const createUserSchema = Joi.object({
	username: username.required(),
	fullname: fullname.required(),
	email: email.required(),
	password: password.required(),
	imageProfile,
});

const updateUserSchema = Joi.object({
	fullname,
	username,
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
