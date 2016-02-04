var os = require('os');
var gulp = require('gulp-help')(require('gulp'));
var jshint = require('gulp-jshint');
var jshintReporter = require('jshint-stylish');
var watch = require('gulp-watch');
var shell = require('gulp-shell');
var open = require('gulp-open');
var sass = require('gulp-sass');
var runSequence = require('run-sequence');

var paths = {
	'src':['./models/**/*.js','./routes/**/*.js', 'keystone.js', 'package.json']

,
	'style': {
		all: './public/styles/**/*.scss',
		output: './public/styles/'
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
gulp.task('watch:lint', function () {
	gulp.watch(paths.src, ['lint']);
});


gulp.task('watch:sass', function () {
	gulp.watch(paths.style.all, ['sass']);
});

gulp.task('sass', 'Compile sass.', function(){
	gulp.src(paths.style.all)
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest(paths.style.output));
});

gulp.task('runKeystone', 'Keystone instance up.', shell.task('node keystone.js'));

gulp.task('openBrowser', 'Open browser with default URL to access.', function(){
	var config = { app: browser, uri: 'http://localhost:3000'};
	gulp.src('').pipe(open(config));
});

gulp.task('watch', [

  'watch:sass',

  'watch:lint'
]);

gulp.task('default', function(cb){
	runSequence('watch', 'runKeystone', cb);
});
