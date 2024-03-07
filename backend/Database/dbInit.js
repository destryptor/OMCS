require('dotenv').config();
const mongoose = require('mongoose');

const MONGO_URI = 'mongodb://localhost:27017/omcs';

const dbInit = async () => {
	try {
		await mongoose.connect(MONGO_URI, {});
		console.log('Database connected and up at port 27017!');
	} catch (error) {
		console.error('Database connection failed');
	}
};

module.exports = dbInit;
