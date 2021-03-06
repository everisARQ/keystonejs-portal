var os = require('os');
var gulp = require('gulp-help')(require('gulp'));
var jshint = require('gulp-jshint');
var jshintReporter = require('jshint-stylish');
var watch = require('gulp-watch');
var shell = require('gulp-shell');
var open = require('gulp-open');
var sass = require('gulp-sass');
var jasmine = require('gulp-jasmine');
var util = require('gulp-util');
var runSequence = require('run-sequence');
var ifElse = require('gulp-if-else');

var paths = {
	'src':['./models/**/*.js','./routes/**/*.js', 'keystone.js', 'package.json'],
	'style': {
		all: './public/styles/**/*.scss',
		output: './public/styles/'
	},
	'test': {
		'routes': 'test/routes/**/*[sS]pec.js'
	}
};

var browser = os.platform() === 'linux' ? 'google-chrome' : (
	          os.platform() === 'darwin' ? 'google chrome' : (
			  os.platform() === 'win32' ? 'chrome' : 'firefox'));

// gulp lint
gulp.task('lint', 'Lints all server side', function(){
	gulp.src(paths.src)
		.pipe(jshint())
		.pipe(jshint.reporter(jshintReporter));
});

// gulp watcher for lint
gulp.task('watch:lint', 'Watch lint.', function () {
	gulp.watch(paths.src, ['lint']);
});


gulp.task('watch:sass', 'Watch sass.', function () {
	gulp.watch(paths.style.all, ['sass']);
});

gulp.task('sass', 'Compile sass.', function(){
	gulp.src(paths.style.all)
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest(paths.style.output));
});

gulp.task('start', 'Run keystonejs-portal.', shell.task('node keystone.js'));

gulp.task('start-dev', 'Run keystonejs-portal with nodemon watching changes in js files.', 
	shell.task('nodemon --watch ./routes --watch ./models keystone.js'));

gulp.task('test', 'Run all project tests', function (done) {
	runSequence(['test:routes'], function (err) {
		if (err) {
			var exitCode = 2;
			util.log(util.colors.red('[ERROR]'), 'gulp test task failed:', util.colors.red(err));
			util.log(util.colors.red('[FAIL]'), 'gulp test task failed - exiting with code', util.colors.red(exitCode));
			return process.exit(exitCode);
		} else {
			util.log(util.colors.green('[OK]'), 'gulp test task finished without errors');
			return done();
		}
	});
});

gulp.task('test:routes', 'Runs routes tests', function (done) {
	return gulp.src(paths.test.routes)
		.pipe(jasmine({
			timeout: 15000
		}));
});


gulp.task('openBrowser', 'Open browser with default URL to access.', function(){
	var config = { app: browser, uri: 'http://localhost:3000'};
	gulp.src('').pipe(open(config));
});

gulp.task('watch', [

  'watch:sass',

  'watch:lint'
]);

gulp.task('keystoneModuleExists', 'Checks if keystone node_module exists and verify node version.',
	shell.task('echo "pre-install validations run" && npm install semver && node -e \"require(\'./node_modules/keystone/lib/archjs/utils/startup-check.js\').nodeVersion(require(\'path\').resolve(\'./package.json\'))\"'));

gulp.task('keystoneModuleDoesntExists', 'Checks if keystone node_module doesn\'t exists.',
	shell.task('echo "First install. Doesn\'t execute validations"'));

gulp.task('checkNodeVersion', 'Cheks if the node version is correct before install.', function () {
	
	ifElse(require('fs').existsSync('./node_modules/keystone'),

		function() {
			gulp.start('keystoneModuleExists');
		},

		function () {
			gulp.start('keystoneModuleDoesntExists');
		}
	);
	
});

gulp.task('default', ['watch', 'start']);
