/**
 * Created by robertozazo on 25/2/16.
 */

var keystone = require('keystone');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	
	locals.filters = {
		communityKey: req.params.communityKey
	};
	
	// Set locals
	locals.section = 'community';
	locals.data = {
		communities: [],
		comunity : []
	};

	view.on('init', function(next) {
		console.log("req.params.communityKey > "+req.params.communityKey);
		if (req.params.communityKey) {
			
			keystone.list('Community').model.findOne({ key: locals.filters.communityKey }).exec(function(err, result) {
				if (err || !result.length) {
					return next(err);
				}
				
				locals.data.comunity = result;
				console.log("locals.data.comunity | "+ locals.data.comunity.name);
				
				next();
			});
			
		} else {
			next();
		}
	});
	
	// Render the view
	view.render('community');

};
