var gulp = require('gulp');
var gutil = require('gulp-util');
var newer = require('gulp-newer');
var argv = require('yargs').argv;
var dev_lang = argv.lang;

gulp.task('datum', function() {
  return gulp.src('src/data/'+ dev_lang +'/**/*.{json,txt,csv,tsv}')
    .pipe(newer('dest/data'))
    .pipe(gulp.dest('dest/data'));
});
