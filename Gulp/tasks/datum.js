var gulp = require('gulp');
var gutil = require('gulp-util');
var newer = require('gulp-newer');

gulp.task('datum', function() {
  return gulp.src('src/data/**/*.{json,txt,csv,tsv}')
    .pipe(newer('dest/data'))
    .pipe(gulp.dest('dest/data'));
});
