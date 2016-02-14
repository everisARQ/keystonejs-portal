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
				if (err) return done(err);
				
				expect(err).toBeNull();
				expect(res.body).not.toBeNull();
				expect(res.ok).toBeTruthy();

				done();
			});
		
	});
	
	afterAll(() => {
		keystone.httpServer.close();
		keystone.mongoose.connection.close();
	});
	
});