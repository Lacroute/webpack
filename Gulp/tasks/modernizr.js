var gulp = require('gulp');
var gutil = require('gulp-util');
var newer = require('gulp-newer');

gulp.task('modernizr', function() {
  return gulp.src('./src/scripts/vendor/modernizr.custom.*')
    .pipe(newer('./dest/scripts/vendor'))
    .pipe(gulp.dest('./dest/scripts/vendor'));
});
