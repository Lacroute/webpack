var gulp = require('gulp');
var gutil = require('gulp-util');
var newer = require('gulp-newer');
var argv = require('yargs').argv;
var dev_lang = argv.lang;
var combine = require('stream-combiner');


function onthefly() {
  return combine(gulp.dest('./dest/styles/fonts'));
}

gulp.task('fonts', function() {
  return gulp.src('src/styles/fonts/'+ dev_lang +'/*.{eot,svg,ttf,woff,woff2}')
    .pipe(newer('dest/styles/fonts'))
    // .pipe(gulp.dest('dest/styles/fonts'));
    .pipe(onthefly());
});
