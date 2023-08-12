const UsersService = require("./users.service");
const boom = require("@hapi/boom");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { config } = require("../config/config");
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

const service = new UsersService();
class AuthService {
	async getUser(email, password) {
		const user = await service.findByEmail(email);
		if (!user) {
			throw boom.unauthorized("User not found!");
		}
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			throw boom.unauthorized("Credentials are invalid");
		}
		delete user.dataValues.password;
		return user;
	}
	signToken(user) {
		const payload = {
			sub: user.id,
			name: user.fullname,
			email: user.email,
		};
		const token = jwt.sign(payload, config.secretKey);
		return { user, token };
	}

	async sendMail(email) {
		const user = await service.findByEmail(email);
		if (!user) {
			throw boom.unauthorized("The email doesn't exists");
		}

		const templateFilePath = path.join(
			__dirname,
			"../views",
			"email.template.html"
		);
		let htmlContent = fs.readFileSync(templateFilePath, "utf-8");

		const transporter = nodemailer.createTransport({
			host: "smtp.gmail.com",
			port: 465,
			auth: {
				user: config.mailSender,
				pass: config.mailPass,
			},
		});

		await transporter.sendMail({
			from: `"TODOS APP from "`,
			to: `${user.email}`,
			subject: "Password Recovery",
			text: "Recuperación de contraseña",
			html: htmlContent,
		});
		console.log("Template file path", templateFilePath);
		return {
			message: "mail sent",
		};
	}
}

module.exports = AuthService;
