'use strict';
const mongoose = require('mongoose');

module.exports = (configs) => {
	return mongoose.connect(configs.string('MONGO_URI'));
};
