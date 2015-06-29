var gulp   = require('gulp');
var gutil  = require('gulp-util');
var bs     = require('browser-sync').create();
var newer  = require('gulp-newer');

gulp.task('images', function(cb) {
  return gulp.src('src/images/**/*.{png,jpg,svg}')
    .pipe(newer('dest/images'))
    .pipe(gulp.dest('dest/images'));
});
