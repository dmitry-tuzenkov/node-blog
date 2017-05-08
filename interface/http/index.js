'use strict';
const path = require('path');
const restify = require('restify');
const container = require('../../container');
const application = container.resolve('application');
const logger = container.resolve('logger');
const configs = container.resolve('configs');

let port = configs.int('HTTP_PORT', 3001);
let server = restify.createServer({
	name: configs.string('APP_NAME', 'node-api'),
	version: configs.string('APP_VERSION', '1.0.0')
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser({
	mapFiles: true
}));
server.use(restify.CORS());
server.use(restify.gzipResponse());

server.get('/articles', container.cradle.articleRoute.list);
server.get('/articles/:id', container.cradle.articleRoute.view);
server.post('/articles/:id', container.cradle.articleRoute.create);
server.put('/articles/:id', container.cradle.articleRoute.update);
server.del('/articles/:id', container.cradle.articleRoute.delete);

server.get('/tags', container.cradle.tagRoute.list);
server.get('/tags/:id', container.cradle.tagRoute.view);
server.post('/tags/:id', container.cradle.tagRoute.create);
server.put('/tags/:id', container.cradle.tagRoute.update);
server.del('/tags/:id', container.cradle.tagRoute.delete);

module.exports = application
	.start()
	.then(() => {
		server.listen(port, () => {
			logger.info('%s listening at %s', server.name, server.url);
		});

		return server;
	})
	.catch(cause => {
		logger.error(cause.message, cause.stack);
		process.exit(1);
	});
