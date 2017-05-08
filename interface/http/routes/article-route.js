'use strict';
const fs = require('fs');

module.exports = ({ articleController, imageController }) => {
	let route = {};

	route.list = (req, res, next) => {
		return articleController
			.findAll({}, req.query.page)
			.then(result => res.json(result))
			.catch(cause => {
				return next(cause);
			});
	};

	route.view = (req, res, next) => {
		return articleController
			.findOne({
				_id: req.params.id
			})
			.then(result => res.json(result))
			.catch(cause => {
				return next(cause);
			});
	};

	route.create = (req, res, next) => {
		return imageController
			.store(fs.createReadStream(req.files.image.path))
			.then(stream => {
				let attrs = req.body;
				attrs.avatar_url = stream.path;

				return Promise.all([
					articleController.create(attrs),
					imageController.grayscale(stream)
				]);
			})
			.then(result => res.json(result))
			.catch(cause => {
				return next(cause);
			});
	};

	route.update = (req, res, next) => {
		return articleController
			.update(req.body)
			.then(result => res.json(result))
			.catch(cause => {
				return next(cause);
			});
	};

	route.delete = (req, res, next) => {
		return articleController
			.delete({
				_id: req.params.id
			})
			.then(result => res.json(result))
			.catch(cause => {
				return next(cause);
			});
	};

	return route;
};
