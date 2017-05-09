'use strict';
const sinon = require('sinon');
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

	it('should find all', () => {
		let spy = sinon.spy(ArticleModel, 'find');

		controller = new ArticleController({
			logger: loggerMock,
			configs: configsMock,
			database: databaseMock,
			articleModel: articleModelMock
		});

		controller.findAll();
		expect(spy.calledOnce)
			.to.be.true;

	});
});
