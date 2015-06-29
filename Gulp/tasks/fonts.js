var gulp = require('gulp');
var gutil = require('gulp-util');
var newer = require('gulp-newer');

gulp.task('fonts', function() {
  return gulp.src('src/styles/fonts/**/*.{eot,svg,ttf,woff}')
    .pipe(newer('dest/styles/fonts'))
    .pipe(gulp.dest('dest/styles/fonts'));
});
