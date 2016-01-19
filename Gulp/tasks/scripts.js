var gulp   = require('gulp');
var gutil  = require('gulp-util');
var newer  = require('gulp-newer');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

// gulp.task('scripts', function() {
//   return gulp.src('src/scripts/**/*.js')
//     // .pipe(jshint('.jshintrc'))
//     // .pipe(jshint.reporter('jshint-stylish'))
//     .pipe(newer('dest/scripts'))
//     .pipe(gulp.dest('dest/scripts'));
// });
//
gulp.task('scripts', function() {
    return browserify('./src/scripts/entry.js', {debug: true})
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./dest/scripts'));
});
