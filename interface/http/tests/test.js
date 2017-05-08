'use strict';
const supertest = require('supertest');
const server = require('../');


describe('Routes testing...', function () {
	let httpEndpoint = supertest.agent("http://localhost:4000");

	it('should work', function (done) {
		httpEndpoint
			.get('/articles')
			.expect('Content-Type', /json/)
			.expect('Content-Length', '60')
			.expect(200)
			.end((err, res) => {

				console.log(res);
				done();
			});
	});


});
