'use strict';

const mongoose = require('mongoose'),
	createdModifiedPlugin = require('mongoose-createdmodified')
	.createdModifiedPlugin;

const ArticleSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		trim: true,
	},

	status: {
		enum: ['draft', 'public']
	},

	text: {
		type: String,
		required: true,
		trim: true,
	},

	imageUrl: {
		type: String,
		required: true,
		trim: true
	}
}, { minimize: false });

ArticleSchema.plugin(createdModifiedPlugin, { index: true });
const Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;
