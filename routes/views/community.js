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
		community : []
	};

	view.on('init', function(next) {
		if (req.params.communityKey) {
			
			console.log("locals.filters.communityKey : "+locals.filters.communityKey );
			
			keystone.list('Community').model.find({ 'key': locals.filters.communityKey }).exec(function(err, result) {
				
				if (err || !result.length) {
					console.log("Error : "+err);
					return next(err);
				}
				
				locals.data.community = result[0];
				console.log("locals.data.comunity | "+ locals.data.community.name);
				
				next();
			});
			
		} else {
			next();
		}
	});
	
	// Render the view
	view.render('community');

};
