var gulp   = require('gulp');
var gutil  = require('gulp-util');
var bs     = require('browser-sync').create();
var newer  = require('gulp-newer');
var jshint = require('gulp-jshint');

gulp.task('scripts', function() {
  return gulp.src('src/scripts/**/*.js')
    // .pipe(jshint('.jshintrc'))
    // .pipe(jshint.reporter('jshint-stylish'))
    .pipe(newer('dest/scripts'))
    .pipe(gulp.dest('dest/scripts'));
});
