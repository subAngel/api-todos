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

	async sendRecovery(email) {
		const user = await service.findByEmail(email);

		const payload = {
			sub: user.id,
			fullname: user.fullname,
			username: user.username,
		};
		const token = jwt.sign(payload, config.secretKey, { expiresIn: "10min" });

		const templateFilePath = path.join(
			__dirname,
			"../views",
			"email.template.html"
		);
		let htmlContent = fs.readFileSync(templateFilePath, "utf-8");
		const emailContent = htmlContent.replace("{{TOKEN}}", token); // TODO
		const mail = {
			from: `"TODOS APP"`,
			to: `${user.email}`,
			subject: "Password Recovery",
			text: "Recuperación de contraseña",
			html: htmlContent,
		};
		const rta = await this.sendMail(mail);
		return rta;
	}

	async sendMail(infomail) {
		const user = await service.findByEmail(email);
		if (!user) {
			throw boom.unauthorized("The email doesn't exists");
		}

		const transporter = nodemailer.createTransport({
			host: "smtp.gmail.com",
			port: 465,
			auth: {
				user: config.mailSender,
				pass: config.mailPass,
			},
		});

		await transporter.sendMail(infomail);
		return {
			message: "mail sent",
		};
	}
}

module.exports = AuthService;
