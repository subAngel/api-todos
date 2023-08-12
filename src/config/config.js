require("dotenv").config();
const config = {
	env: process.env.NODE_ENV || "dev",
	port: process.env.PORT || 3080,
	dbUser: process.env.DB_USER,
	dbPassword: process.env.DB_PASSWORD,
	dbName: process.env.DB_NAME,
	dbHost: process.env.DB_HOST,
	dbPort: process.env.DB_PORT,
	apiKey: process.env.API_KEY,
	secretKey: process.env.SECRET,
	mailPass: process.env.GMAIL_PASS,
	mailSender: process.env.GMAIL_EMAIL,
};

module.exports = { config };
