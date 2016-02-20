'use strict';

var request     = require('supertest'),
	keystone    = require('../helpers/keystone');

const app           = keystone.app;
const defaultLocale = keystone.get('i18n').getLocale();

/**
 * @param language
 * @returns {string} Language route using string interpolation.
 */
var getRoute = (language) => {
	return `/languages/${language}`;	
};

/**
 * TODO all todo's in this test must be removed as soon as this issue is fixed:
 * @link {https://github.com/tinganho/express-request-language/issues/5}
 */
describe('Language route', () => {
	
	it('must not change language without request param', (done) => {
		
		request(app)
			.get(getRoute(''))
			.expect(302)
			.expect('Location', '/')
			// TODO check langauge cookie value is the default locale
			// .expect('set-cookie', new RegExp(`language=${defaultLocale}`, 'g'))
			.end((err, res) => {
				if (err) return done.fail(err);
				
				expect(err).toBeNull();
				expect(res.body).not.toBeNull();
				
				done();
			});
	});
	
	it('must not change language when requested an unsupported language', (done) => {
		
		request(app)
			.get(getRoute('de'))
			.expect(302)
			.expect('Location', '/')
			// TODO check langauge cookie value is the default locale
			// .expect('set-cookie', new RegExp(`language=${defaultLocale}`, 'g'))
			.end((err, res) => {
				if (err) return done.fail(err);
				
				expect(err).toBeNull();
				expect(res.body).not.toBeNull();
				
				done();
			});
		
	});
	
	it('must change language when requested a supported language', (done) => {
		
		request(app)
			.get(getRoute('es'))
			.expect(302)
			.expect('Location', '/')
			.expect('set-cookie', /language=es/)
			.end((err, res) => {
				if (err) return done.fail(err);
				
				expect(err).toBeNull();
				expect(res.body).not.toBeNull();
				
				done();
			});
		
	});

	afterAll(keystone.closeConnections);
	
});
