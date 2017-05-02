'use strict';
const AbstractController = require('./abstract-controller');
const ARTICLES_COUNT = 25;

class ArticleController extends AbstractController {
	constructor({ logger, configs, articleModel }) {
		this.logger = logger;
		this.configs = configs;
		this.articleModel = articleModel;
	}

	findAll(query, page) {
		page = page || 1;

		return this
			.articleModel
			.find(query)
			.skip((page - 1) * ARTICLES_COUNT)
			.limit(ARTICLES_COUNT);
	}

	findOne(query) {
		return this
			.articleModel
			.findOne(query);
	}

	create(entity) {
		return this.articleModel.create(entity);
	}

	update(entity) {
		if (!entity._id) {
			throw new Error('_id is required');
		}

		return this
			.articleModel
			.update({ where: { _id: entity.id } }, entity);
	}

	delete(query) {
		if (!query._id) {
			throw new Error('_id is required');
		}

		return this
			.articleModel
			.remove(query);
	}
}

module.exports = ArticleController;
