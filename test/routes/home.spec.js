'use strict';

var request     = require('supertest'),
	keystone    = require('../helpers/keystone');

const app   = keystone.app;
const route = '/';

describe('Home route', () => {
	
	it('should not return an error', (done) => {
		request(app)
			.get(route)
			.expect(200)
			.end((err, res) => {
				if (err) return done.fail(err);
				
				expect(err).toBeNull();
				expect(res.body).not.toBeNull();
				expect(res.ok).toBeTruthy();

				done();
			});
		
	});
	
	afterAll(keystone.closeConnections);
	
});
