'use strict';

var keystone = require('../../../keystone.js');

const port = process.env.TEST_PORT || 5150;
keystone.set('port', port);

module.exports = keystone;
