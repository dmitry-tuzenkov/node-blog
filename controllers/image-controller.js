'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const AbstractController = require('./abstract-controller');

class ImageController extends AbstractController {
	constructor({ logger, configs, grayscaleProcessor }) {
		super();
		this.logger = logger;
		this.configs = configs;
		this.grayscaleProcessor = grayscaleProcessor;
		this.stream = null;
	}

	store(stream) {
		return new Promise((resolve) => {
			let filename = crypto.randomBytes(8)
				.toString('hex') + '.' + path.extname(stream.path);
			let fullpath = path.resolve(__dirname, '../storage', filename),
				rstream = fs.createReadStream(path);

			rstream.pipe(fs.createWriteStream(fullpath));
			rstream.end();

			resolve(stream);
		});
	}

	grayscale(stream) {
		return this.grayscaleProcessor.execute(stream);
	}
}

module.exports = ImageController;
