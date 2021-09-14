const config = require('../config');
const CryptoJS = require('crypto-js');

const { CRYPTO_KEY } = config;

module.exports = {
	encryptString: (str) => {
		return CryptoJS.AES.encrypt(str, CRYPTO_KEY).toString();
	},

	decryptString: (str) => {
		const bytes = CryptoJS.AES.decrypt(str, CRYPTO_KEY);

		return bytes.toString(CryptoJS.enc.Utf8);
	},
};
