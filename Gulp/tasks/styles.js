var gulp       = require('gulp');
var gutil      = require('gulp-util');
var newer      = require('gulp-newer');
var sass       = require('gulp-ruby-sass');
var sourcemaps = require('gulp-sourcemaps');
var prefix = require('gulp-autoprefixer');
var browserSync     = require('browser-sync').get('DevServer');

gulp.task('sass', function () {
  return sass('./src/styles/styles.scss', {sourcemap: true})
  .pipe(sourcemaps.init())
  .on('error', function (err) {
    console.error('Error!', err.message);
  })
  .pipe(prefix("last 1 version", "> 1%", "ie 8", "ie 7"))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('./dest/styles'))
  .pipe(browserSync.stream({match: '**/*.css'}));
});
