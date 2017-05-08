'use strict';
const sinon = require('sinon');
const sinonMongoose = require('sinon-mongoose');
const expect = require('chai')
	.expect;
const mongoose = require('mongoose');

const ArticleModel = require('../datasources/mongo/models/article-model');
const ArticleController = require('./article-controller');

describe('ArticleController', () => {
	let controller, loggerMock, configsMock, databaseMock, articleModelMock;

	beforeEach(() => {
		loggerMock = {};
		configsMock = {};

		articleModelMock = sinon.mock(ArticleModel);
		databaseMock = {
			model: () => ArticleModel
		};
	});

	it('should find all', (done) => {
		// let spy = sinon.spy(articleModelMock, 'find');

		articleModelMock
			.expects('find')
			// .withArgs()
			.chain('limit', 25)
			.chain('skip', 0)
			.chain('exec')
			.yields(null, []);

		controller = new ArticleController({
			logger: loggerMock,
			configs: configsMock,
			database: databaseMock,
			articleModel: articleModelMock
		});

		return controller
			.findAll({}, 1)
			.then(result => {
				articleModelMock.verify();
				articleModelMock.restore();
				expect(result)
					.to.exist;

				done();
			});
	});
});
