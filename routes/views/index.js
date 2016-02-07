var keystone = require('keystone');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res);
	var locals = res.locals;
	
	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';
	locals.data = {
		communities: []
	};

	// Load communities
	view.on('init', function(next) {
		
		keystone.list('Community').model.find().sort('name').exec(function(err, results) {

			if (err || !results.length) {
				return next(err);
			}

			locals.data.communities = results;
			next();

		});

	});
	
	// Render the view
	view.render('index');
	
};
