var gulp = require('gulp');
var gutil = require('gulp-util');
var newer = require('gulp-newer');

gulp.task('others', function() {
  return gulp.src('src/html/**/*.{json,txt,md,xml,ico,png}')
    .pipe(newer('dest'))
    .pipe(gulp.dest('dest'));
});
