var gulp   = require('gulp');
var gutil  = require('gulp-util');
var newer  = require('gulp-newer');

gulp.task('html', function() {
  return gulp.src('./src/html/*.html')
    .pipe(newer('./dest/'))
    .pipe(gulp.dest('./dest/'));
});
