'use strict';
const _ = require('lodash');
const getenv = require('getenv');
const dotenv = require('dotenv');
const awilix = require('awilix');
const application = require('./lib/application');
const grayscaleProcessor = require('./lib/grayscale-processor');
const logger = require('./loggers/logger');
const mongo = require('./datasources/mongo');
const container = awilix.createContainer();

dotenv.load();
module.exports = container;

let opts = {
	formatName: 'camelCase',
	registrationOptions: {
		lifetime: awilix.Lifetime.SCOPED
	}
};

container
	.loadModules([
		'controllers/*.js',
		'datasources/mongo/repositories/*.js',
		'interface/http/routes/*.js'
	], opts);

container
	.registerClass({
		application: [application, { lifetime: awilix.Lifetime.SINGLETON }],
		grayscaleProcessor: [grayscaleProcessor, { lifetime: awilix.Lifetime.SINGLETON }]
	})
	.registerFunction({
		logger: [logger, { lifetime: awilix.Lifetime.SINGLETON }],
		database: [mongo, { lifetime: awilix.Lifetime.SINGLETON }]
	})
	.loadModules(
		['datasources/mongo/models/*.js'], {
			formatName: 'camelCase',
			registrationOptions: {
				lifetime: awilix.Lifetime.TRANSIENT
			}
		})
	// TODO: need abstract storages, config classes
	.registerValue({
		configs: getenv
	});

// container
//   .registerClass({
//     app: [Application, { lifetime: awilix.Lifetime.SINGLETON }],
//     server: [Server, { lifetime: awilix.Lifetime.SINGLETON }]
//   })
//   .registerFunction({
//     router: [router, { lifetime: awilix.Lifetime.SINGLETON }],
//     logger: [logger, { lifetime: awilix.Lifetime.SINGLETON }]
//   })
//   .registerValue({ config });
