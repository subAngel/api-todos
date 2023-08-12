const UsersService = require("./users.service");
const boom = require("@hapi/boom");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { config } = require("../config/config");
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const passport = require("passport");

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
		delete user.dataValues.recoveryToken;
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
		if (!user) {
			throw boom.unauthorized();
		}
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
		const htmlContent = fs.readFileSync(templateFilePath, "utf-8");
		const emailContent = htmlContent.replace("{{TOKEN}}", token);
		await service.update(user.id, { recoveryToken: token });
		const mail = {
			from: config.mailSender,
			to: user.email,
			subject: "Password Recovery",
			text: "Recuperación de contraseña",
			html: emailContent,
		};
		const rta = await this.sendMail(mail);
		return rta;
	}

	async changePassword(token, newPassword) {
		try {
			const payload = jwt.verify(token, config.secretKey);
			const user = await service.findOne(payload.sub);
			if (user.recoveryToken !== token) {
				throw boom.unauthorized();
			}
			const hash = await bcrypt.hash(newPassword, 10);
			await service.update(user.id, {
				recoveryToken: null,
				password: hash,
			});
			return {
				message: "Password changed",
			};
		} catch (error) {
			throw boom.unauthorized();
		}
	}

	async sendMail(infomail) {
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
