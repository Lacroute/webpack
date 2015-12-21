var gulp   = require('gulp');
var gutil  = require('gulp-util');
var del = require('del');

gulp.task('clean', function() {
  return del(['./build', './dest', './sass-cache']);
});