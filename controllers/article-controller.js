'use strict';
const AbstractController = require('./abstract-controller');
const ARTICLES_COUNT = 25;

class ArticleController extends AbstractController {
	constructor({ logger, configs, database, articleModel }) {
		super();
		this.logger = logger;
		this.configs = configs;
		this.database = database;
		this.articleModel_ = articleModel;
		this.articleModel = database.model('Article');
	}

	findAll(query, page) {
		page = page || 1;

		return this
			.articleModel
			.find(query)
			.skip((page - 1) * ARTICLES_COUNT)
			.populate('tags')
			.limit(ARTICLES_COUNT)
			.exec();
	}

	findOne(query) {
		return this
			.articleModel
			.findOne(query)
			.exec();
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
