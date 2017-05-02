'use strict';

class Application {
	constructor({ configs, database, logger }) {
		this.logger = logger;
		this.configs = configs;
		this.database = database;
	}

	start() {
		// TODO: Add start app logic, for example database sync or connect
		return Promise.resolve();
	}
}

module.exports = Application;
