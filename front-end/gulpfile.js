// include the required packages.
var gulp       = require('gulp');
var sass = require('gulp-sass');
var uglify     = require('gulp-uglify');
var concat     = require('gulp-concat');
var clean      = require('gulp-clean');
var runSequence = require('run-sequence');
var htmlmin = require('gulp-htmlmin');
var browserSync = require('browser-sync').create();


// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./www/",
	        middleware: function (req, res, next) {
	            res.setHeader('Access-Control-Allow-Origin', '*');
	            next();
	        }
        }
    });
});

// Gulp SASS
gulp.task('sass', function () {
	gulp.src('./develop/assets/sass/app.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./www/assets/css/'));
});

// - Compile all JS
gulp.task('js', function(){
	gulp.src([
			'./bower_components/angular/angular.min.js',
			'./bower_components/angular-route/angular-route.min.js',
			'./bower_components/angular-messages/angular-messages.min.js',
			'./bower_components/jquery/dist/jquery.min.js',
			'./bower_components/materialize/dist/js/materialize.min.js',
			'./develop/js/app.js',
			'./develop/js/config/**.js',
			'./develop/js/controllers/**.js',
			'./develop/js/directives/**.js',
			'./develop/js/modules/angular-locale_pt-**.js',
			'./develop/js/services/**.js'
		])
		.pipe(concat('scripts.min.js'))
		//.pipe(uglify())
		.pipe(gulp.dest('./www/js'));
});

// - Clean Dist DIR
gulp.task('clean', function () {
  return gulp.src('./www/**/*.*', {read: false})
    .pipe(clean({force: true}));
});

// - Clean JS
gulp.task('cleanJS', function () {
  return gulp.src('./js/scripts.min.js', {read: false})
    .pipe(clean());
});

// - Fonts Dist DIR
gulp.task('fonts', function () {
  return gulp.src('./develop/assets/fonts/**/*.*')
    .pipe(gulp.dest('./www/assets/fonts'));
});

// - Favicon Dist
gulp.task('faviconDist', function () {
  return gulp.src(['./develop/assets/favicons/**/*.*'])
    .pipe(gulp.dest('./www/assets/favicons'));
});


// - Img Dist DIR
gulp.task('img', function () {
  return gulp.src('./develop/assets/img/**/*.*')
    .pipe(gulp.dest('./www/assets/img'));
});


// Watch Task
gulp.task('watch', function () {
	gulp.watch('./develop/js/**/*.*', ['js']).on('change', browserSync.reload);
	gulp.watch('./develop/view/**/*.*', ['distHtml']).on('change', browserSync.reload);
	gulp.watch('./develop/index.html', ['distIndex']).on('change', browserSync.reload);
	gulp.watch('./develop/assets/sass/**/*.*', ['sass']).on('change', browserSync.reload);	
});

// - HTML Dist DIR
gulp.task('distIndex', function () {
  return gulp.src(['./develop/index.html'])
  	.pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./www/'));
});
gulp.task('distHtml', function () {
  return gulp.src(['./develop/view/**/*.*'])
  	.pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./www/view/'));
});


// - Electron Dist
gulp.task('distPackageJson', function () {
  return gulp.src(['./package.json'])
    .pipe(gulp.dest('./www/'));
});
gulp.task('distElectron', function () {
  return gulp.src(['./main.js'])
    .pipe(gulp.dest('./www/'));
});

// Gulp Default Task - RUN THIS!
gulp.task('default', function (cb) {
	runSequence(['clean', 'cleanJS'], ['js', 'sass', 'fonts', 'img', 'distPackageJson', 'faviconDist', 'distElectron','distIndex', 'distHtml', 'browser-sync', 'watch'], cb);
});