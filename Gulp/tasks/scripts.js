var gulp   = require('gulp');
var gutil  = require('gulp-util');
var bs     = require('browser-sync').create();
var newer  = require('gulp-newer');


gulp.task('scripts', function() {
  return gulp.src('src/scripts/**/*.js')
    .pipe(newer('dest/scripts'))
    .pipe(gulp.dest('dest/scripts'));
});
