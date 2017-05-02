'use strict';
const path = require('path');
const winston = require('winston');

module.exports = (opts) => {
	// var parts = module.filename.split(path.sep),
	// 	filename = parts.splice(-2)
	// 	.join('/'),
	// 	label = process.pid + ':' + filename;

	return new(winston.Logger)({
		levels: {
			error: 0,
			warn: 1,
			info: 2,
			debug: 3,
			trace: 4
		},
		colors: {
			error: 'red',
			warn: 'yellow',
			info: 'green',
			debug: 'magenta',
			trace: 'cyan'
		},
		transports: [
			new(winston.transports.Console)({
				level: 'trace',
				label: '',
				handleExceptions: true,
				prettyPrint: true,
				colorize: true,
				silent: false,
				timestamp: timestamp
			}),
			new(winston.transports.File)({
				level: 'warn',
				label: '',
				timestamp: timestamp,
				filename: path.join(__dirname, '../logs/app.log'),
				handleExceptions: true,
				prettyPrint: false,
				json: false,
				maxsize: 5242880, // 5MB
				maxFiles: 5
			})
		]
	});

};

function timestamp() {
	return (new Date()
		.toISOString());
}
