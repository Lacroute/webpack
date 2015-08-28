var gulp   = require('gulp');
var gutil  = require('gulp-util');
var bs     = require('browser-sync');
var newer  = require('gulp-newer');
var imagemin = require('imagemin');
var svgo = require('imagemin-svgo');
var jpg = require('imagemin-jpegtran');
var optipng = require('imagemin-optipng');



gulp.task('png', function() {
  return gulp.src('src/images/**/*.png')
    .pipe(optipng({optimizationLevel: 3})())
    .pipe(newer('dest/images'))
    .pipe(gulp.dest('dest/images'));
});

gulp.task('jpg', function() {
  return gulp.src('src/images/**/*.jpg')
    .pipe(jpg({progressive: true})())
    .pipe(newer('dest/images'))
    .pipe(gulp.dest('dest/images'));
});

gulp.task('svg', function() {
  return gulp.src('src/images/**/*.svg')
    .pipe(svgo()())
    .pipe(newer('dest/images'))
    .pipe(gulp.dest('dest/images'));
});

gulp.task('images', ['png', 'jpg', 'svg']);
