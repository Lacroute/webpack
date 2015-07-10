var gulp = require('gulp');
var gutil = require('gulp-util');
var newer = require('gulp-newer');
var argv = require('yargs').argv;
var dev_lang = argv.lang;

gulp.task('fonts', function() {
  return gulp.src('src/styles/fonts/'+ dev_lang +'/*.{eot,svg,ttf,woff,woff2}')
    .pipe(newer('dest/styles/fonts'))
    .pipe(gulp.dest('dest/styles/fonts'));
});
