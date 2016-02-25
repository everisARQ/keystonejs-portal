/**
 * Created by robertozazo on 25/2/16.
 */

var keystone = require('keystone');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'community';
	
	// Render the view
	view.render('community');

};
