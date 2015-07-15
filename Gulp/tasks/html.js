var gulp   = require('gulp');
var gutil  = require('gulp-util');
var newer  = require('gulp-newer');
var path = require('path');
var jade = require('gulp-jade');
var html = require('gulp-html-prettify');
var fs = require('fs');
var data = JSON.parse(fs.readFileSync('./src/html/graphics.json'));

gulp.task('html', function() {
  return gulp.src('./src/html/*.{json,txt,png,ico,xml}')
    .pipe(newer('./dest/'))
    .pipe(gulp.dest('./dest/'));
});

gulp.task('jade', function() {
  console.log(data.metadata.headline);
  return gulp.src('./src/html/index.jade')
    .pipe(jade({
      locals: data.metadata
    }))
    .pipe(html({
      indent_char: ' ', indent_size: 2
    }))
    .pipe(gulp.dest('dest/'));
});
