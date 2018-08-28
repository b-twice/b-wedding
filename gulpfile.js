var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var tsify = require('tsify');
var watchify = require("watchify");
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var buffer = require('vinyl-buffer');
var gutil = require("gulp-util");
var sass = require('gulp-sass');
var paths = {
    pages: ['src/*.html'],
    assets: ['src/assets/*'],
    styles: [
        'src/*.scss',
        'node_modules/bootstrap/scss/*.scss'
    ],
    entries: ['src/main.ts'],
    dist: 'dist',
    dist_dev: 'dist_dev'

};
/*
    Gulp build taken from TypeScript Handbook: https://www.typescriptlang.org/docs/handbook/gulp.html
    This gets a simple build process for most everything need on a simple site
    // TODO - live reload of html/css
    
*/


//  DEV
var package = browserify({
    basedir: '.',
    debug: true,
    entries: paths.entries,
    cache: {},
    packageCache: {}
}).plugin(tsify);
// var watchedBrowserify = watchify(package);

gulp.task('copy-html-dev', function () {
    return gulp.src(paths.pages)
        .pipe(gulp.dest(paths.dist_dev));
});
gulp.task('copy-assets-dev', function () {
    return gulp.src(paths.assets)
        .pipe(gulp.dest(`${paths.dist_dev}/assets`));
});

gulp.task('sass', function () {
  return gulp.src(paths.styles)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(paths.dist_dev));
});

function bundle() {
    return package
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(paths.dist_dev));
}
gulp.task("default", ["copy-html-dev", "copy-assets-dev", "sass"], bundle);
// watchedBrowserify.on("update", bundle);
// watchedBrowserify.on("log", gutil.log);


// PROD
gulp.task('copy-html-prod', function () {
    return gulp.src(paths.pages)
        .pipe(gulp.dest(paths.dist));
});
gulp.task('copy-assets-prod', function () {
    return gulp.src(paths.assets)
        .pipe(gulp.dest(`${paths.dist}/assets`));
});

gulp.task('build', ['copy-html-prod', "sass"], function () {
    return browserify({
            basedir: '.',
            debug: false,
            entries: paths.entries,
            cache: {},
            packageCache: {}
        })
        .plugin(tsify)
        .transform('babelify', {
            presets: ['es2015'],
            extensions: ['.ts']
        })
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(paths.dist));
});

