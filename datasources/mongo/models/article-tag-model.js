'use strict';

const mongoose = require('mongoose'),
	createdModifiedPlugin = require('mongoose-createdmodified')
	.createdModifiedPlugin;

const ArticleTagSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true
	},

	imageUrl: {
		type: String,
		required: true,
		trim: true
	}

}, { minimize: false });

ArticleTagSchema.plugin(createdModifiedPlugin, { index: true });
const ArticleTag = mongoose.model('ArticleTag', ArticleTagSchema);

module.exports = ArticleTag;
