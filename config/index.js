const dotenv = require('dotenv');

dotenv.config();

const config = {
	MONGO_URI: process.env.MONGO_URI,
	JWT_SECRET: process.env.JWT_SECRET,
	CRYPTO_KEY: process.env.CRYPTO_KEY,
	REGISTRATION_KEY: process.env.REGISTRATION_KEY,
};

module.exports = config;
