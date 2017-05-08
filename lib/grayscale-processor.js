'use strict';
const grayscale = require('image-grayscale');

class GrayscaleProcessor {
	constructor() {

	}

	execute(stream) {
		return grayscale(stream, { logProgress: true });
	}

}

module.exports = GrayscaleProcessor;
