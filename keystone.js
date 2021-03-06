// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').load();
var keystone    		= require('keystone'),
	i18n        		= require('i18n'),
	fs 					= require('fs'),
	FileStreamRotator 	= require('file-stream-rotator'),
	path        		= require('path');

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.

keystone.init({

	'name': 'keystonejs-portal',
	'brand': 'keystonejs-portal',
	
	'sass': 'public',
	'static': 'public',
	'favicon': 'public/favicon.ico',
	'views': 'templates/views',
	'view engine': 'jade',
	
	'emails': 'templates/emails',
	
	'auto update': true,
	'session': true,
	'auth': true,
	'user model': 'User',

});

// Load your project's Models

keystone.import('models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js

keystone.set('locals', {
	_: require('underscore'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable
});

// global i18n configuration
var i18nConfig = {
	supportedLocales: ['en', 'es'],
	defaultLocale: 'en',
	queryName: 'lang',
	cookie: {
		name: 'language',
		options: { maxAge: 24 * 3600 * 1000},
		changeLocaleUrl: '/languages/{language}' 
	}
};

// i18n configuration
i18n.configure({
	locales         : i18nConfig.supportedLocales,
	defaultLocale   : i18nConfig.defaultLocale,
	cookie          : i18nConfig.cookie.name,
	directory       : path.join(__dirname, 'locales'),
	objectNotation  : true,
	updateFiles     : false
});

// keystone language options
keystone.set('language options', {
	'supported languages'       : i18nConfig.supportedLocales,
	'language query name'       : i18nConfig.queryName,
	'language cookie'           : i18nConfig.cookie.name,
	'language cookie options'   : i18nConfig.cookie.options,
	'language select url'       : i18nConfig.cookie.changeLocaleUrl
});

// Load your project's Routes
keystone.set('routes', require('./routes'));

// HTTP LOGGER
keystone.set('logger', 'common');

var logDirectory = __dirname + '/log'
// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

// create a rotating write stream
var accessLogStream = FileStreamRotator.getStream({
	date_format: 'YYYYMMDD',
	filename: logDirectory + '/access-%DATE%.log',
	frequency: 'daily',
	verbose: false
});

keystone.set('logger options', {stream: accessLogStream});

// Setup common locals for your emails. The following are required by Keystone's
// default email templates, you may remove them if you're using your own.

keystone.set('email locals', {
	logo_src: '/images/logo-email.gif',
	logo_width: 194,
	logo_height: 76,
	theme: {
		email_bg: '#f9f9f9',
		link_color: '#2697de',
		buttons: {
			color: '#fff',
			background_color: '#2697de',
			border_color: '#1a7cb7'
		}
	}
});

// Setup replacement rules for emails, to automate the handling of differences
// between development a production.

// Be sure to update this rule to include your site's actual domain, and add
// other rules your email templates require.

keystone.set('email rules', [{
	find: '/images/',
	replace: (keystone.get('env') == 'production') ? 'http://www.your-server.com/images/' : 'http://localhost:3000/images/'
}, {
	find: '/keystone/',
	replace: (keystone.get('env') == 'production') ? 'http://www.your-server.com/keystone/' : 'http://localhost:3000/keystone/'
}]);

// Load your project's email test routes

keystone.set('email tests', require('./routes/emails'));

// Configure the navigation bar in Keystone's Admin UI

keystone.set('nav', {
	'posts': ['posts', 'post-categories'],
	'galleries': 'galleries',
	'enquiries': 'enquiries',
	'users': 'users'
});

keystone.set('Logger options', {
	level: 'info'/*,
	formatter: '',
	timestamp: '',
	logstash: '',
	json: ''*/
	
});

// Start Keystone to connect to your database and initialise the web server
keystone.start();

module.exports = keystone;
