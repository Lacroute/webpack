var gulp   = require('gulp');
var gutil  = require('gulp-util');
var clean = require('gulp-rimraf');

gulp.task('clean', function() {
  return gulp.src(['dest', 'build'])
    .pipe(clean());

});
