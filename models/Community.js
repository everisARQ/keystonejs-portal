var keystone = require('keystone');

/**
 * Community Model
 * ==================
 */

var Community = new keystone.List('Community', {
	autokey: { from: 'name', path: 'key', unique: true }
});

Community.add({
	name: { type: String, required: true },
	description: { type: String, required: false },
	logosrc: { type: String },
	link: { type: String }
});

Community.register();
