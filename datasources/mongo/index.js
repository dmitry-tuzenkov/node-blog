'use strict';
const mongoose = require('mongoose');

module.exports = ({ configs }) => {
	mongoose.Promise = global.Promise;
	return mongoose.connect(configs.string('MONGO_URI'));
};
