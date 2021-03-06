'use strict';

var keystone = require('../../../keystone.js');

const port = process.env.TEST_PORT || 5150;
keystone.set('auto update', false);
keystone.set('port', port);

/**
 * Closes keystone http server and mongodb connections.
 */
keystone.closeConnections = () => {
	keystone.httpServer.close();
	keystone.mongoose.connection.close();
	keystone.app.close((err) => {
		return (err) ? false : true;
	});
};

module.exports = keystone;
