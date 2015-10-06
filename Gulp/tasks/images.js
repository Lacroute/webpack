var gulp   = require('gulp');
var gutil  = require('gulp-util');
var bs     = require('browser-sync');
var newer  = require('gulp-newer');
var imagemin = require('imagemin');
var svgo = require('imagemin-svgo');
var jpg = require('imagemin-jpegtran');
var optipng = require('imagemin-optipng');
var combine = require('stream-combiner');
var exif = require('exif').ExifImage;
var data = require('gulp-data');
var extend = require('gulp-extend');

function onthefly() {
  return combine(gulp.dest('./dest/images'));
}

gulp.task('png', function() {
  return gulp.src('src/images/**/*.png')
    .pipe(optipng({optimizationLevel: 3})())
    .pipe(newer('dest/images'))
    // .pipe(gulp.dest('dest/images'));
    .pipe(onthefly());
});

gulp.task('jpg', ['exif'],function() {
  return gulp.src('src/images/**/*.jpg')
    .pipe(jpg({progressive: true})())
    .pipe(newer('dest/images'))
    // .pipe(gulp.dest('dest/images'));
    .pipe(onthefly());
});

gulp.task('svg', function() {
  return gulp.src('src/images/**/*.svg')
    .pipe(svgo()())
    .pipe(newer('dest/images'))
    // .pipe(gulp.dest('dest/images'));
    .pipe(onthefly());
});

gulp.task('images', ['png', 'jpg', 'svg']);

gulp.task('exif', function() {
  return gulp.src('./images/**/*.jpg')
    .pipe(data(function (file) {
      return gutil.log(file.path);
    }));
});
