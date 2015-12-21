var gulp = require('gulp');
var gutil = require('gulp-util');
var newer = require('gulp-newer');
var argv = require('yargs').argv;
var dev_lang = argv.lang;
var combine = require('stream-combiner');

function onthefly() {
  return combine(gulp.dest('./dest/data'));
}

gulp.task('datum', function() {
  return gulp.src(['src/data/'+ dev_lang +'/**/*.{json,txt,csv,tsv}','src/data/common/*.{json,txt,csv,tsv,geojson}'])
    .pipe(newer('dest/data'))
    // .pipe(gulp.dest('dest/data'));
    .pipe(onthefly());
});
