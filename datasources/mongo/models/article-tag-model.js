'use strict';

const mongoose = require('mongoose'),
	plugin = require('mongoose-createdmodified')
	.createdModifiedPlugin;

const ArticleTagSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true
	},

	avatarUrl: {
		type: String,
		required: true,
		trim: true
	}

}, { minimize: false });

ArticleTagSchema.plugin(plugin, { index: true });
const ArticleTag = mongoose.model('ArticleTag', ArticleTagSchema);

module.exports = ArticleTag;
