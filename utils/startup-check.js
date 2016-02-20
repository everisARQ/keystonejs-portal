var packages = require('../package.json'),
	checks,
	exitCodes = {
		NODE_VERSION_UNSUPPORTED: 231
	};

checks = {
	check: function check() {
		this.nodeVersion();
	},

	// Make sure the node version is supported
	nodeVersion: function checkNodeVersion() {
		// Tell users if their node version is not supported, and exit
		var semver = require('semver');

		if (!semver.satisfies(process.versions.node, packages.engines.node)) {
			console.error('\x1B[31mERROR: Unsupported version of Node');
			console.error('\x1B[31mkeystonejs-portal needs Node version ' + packages.engines.node +
				' you are using version ' + process.versions.node + '\033[0m\n');
			console.error('\x1B[32mPlease use some of this versions: ~4.2.0 || ~4.3.0\033[0m');

			process.exit(exitCodes.NODE_VERSION_UNSUPPORTED);
		}
	}
};

module.exports = checks;
