// https://github.com/jhades/angularjs-gulp-example/blob/master/gulpfile.js

var gulp = require('gulp');
var del = require('del');
var sass = require('gulp-sass')(require('sass'));
var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var cleanCss = require('gulp-clean-css');
// var rev = require('gulp-rev');
var webserver = require('gulp-webserver');

gulp.task('clean', function (cb) {
    del([
        'dist'
    ], cb);
});

gulp.task('statics', function () {
    return gulp.src([
            'config.json',
            'mouse.json',
            'favicon.ico',
            'mailscript.php'
        ])
        .pipe(gulp.dest('./dist'));
});

gulp.task('fonts', function () {
    return gulp.src([
            './fonts/*',
            './bower_components/latolatin-webfont/fonts/*',
        ])
        .pipe(gulp.dest('./dist/fonts'));
});

gulp.task('styles', function() {
    return gulp.src('./styles/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./dist/styles'));
});

gulp.task('images', function () {
    return gulp.src('./images/*')
        .pipe(gulp.dest('./dist/images'));
});

gulp.task('templates', function() {
    return gulp.src("./templates/**/*.html")
        .pipe(gulp.dest("./dist/templates"));
});

gulp.task('usemin', function() {
    return gulp.src('./index.html')
        .pipe(usemin({
              // css: [ /*rev()*/ ],
              // html: [ htmlmin({ collapseWhitespace: true }) ],
              // js: [ uglify() /*, rev()*/ ],
              // inlinejs: [ uglify() ],
              // inlinecss: [ cleanCss(), 'concat' ]
        }))
        .pipe(gulp.dest('dist/'));
});

gulp.task('build', gulp.series('clean', gulp.parallel('statics', 'fonts','styles','images','templates','usemin')));

gulp.task('watch', function() {
    gulp.watch([
        'lite.html',
        'config.json',
        'mouse.json',
        'favicon.ico',
        'mailscript.php'
    ], gulp.series('statics'));
    gulp.watch(['./fonts/*'], gulp.series('fonts'));
    gulp.watch(['./images/*'], gulp.series('images'));
    gulp.watch(['./styles/*.*css'], gulp.series('styles'));
    gulp.watch(['./templates/*'], gulp.series('templates'));
    gulp.watch(['./index.html','./scripts/**/*.js'], gulp.series('usemin'));
});

gulp.task('webserver', function() {
    gulp.src('.')
        .pipe(webserver({
            livereload: false,
            directoryListing: true,
            open: "http://localhost:8000/dist/index.html"
        }));
});

gulp.task('dev', gulp.series('build', gulp.parallel('watch', 'webserver')));
