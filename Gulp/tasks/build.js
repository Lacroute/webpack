var gulp   = require('gulp');
var gutil  = require('gulp-util');
var ugly = require('gulp-uglify');
var minify = require('gulp-minify-css');
var sass       = require('gulp-ruby-sass');
var prefix = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var newer = require('gulp-newer');

gulp.task('build', function(cb) {

  gulp.src('dest/data/**/*.{jst,json,csv,tsv,txt}')
    .pipe(newer('build/data'))
    .pipe(gulp.dest('build/data'));

  gulp.src(['dest/scripts/*.js', '!dest/vendor/**/*.js'])
    .pipe(ugly())
    .pipe(gulp.dest('build/scripts'));

  gulp.src('src/scripts/vendor/**/*.js')
    .pipe(ugly())
    .pipe(newer('build/scripts/vendor'))
    .pipe(gulp.dest('build/scripts/vendor'));

  gulp.src('dest/*.{json,txt,md,xml,ico,png}')
    .pipe(newer('build'))
    .pipe(gulp.dest(('build')));

  // here, modify lang attr and dir
  gulp.src('dest/index.html')
    .pipe(newer('build'))
    .pipe(gulp.dest(('build')));

  // gulp.src('dest/styles/*.css')
  //   .pipe(minify())
  //   .pipe(newer('build/styles'))
  //   .pipe(gulp.dest('build/styles'));
  sass('./src/styles/styles.scss', {sourcemap: true})
  .pipe(prefix("last 1 version", "> 1%", "ie 8", "ie 7"))
  .pipe(minify())
  .pipe(gulp.dest('./build/styles'));


  gulp.src('dest/styles/fonts/**/*')
    .pipe(newer('build/styles/fonts'))
    .pipe(gulp.dest('build/styles/fonts'));

  gulp.src('dest/images/**/*.{png,jpg,svg}')
    .pipe(newer('build/images'))
    .pipe(gulp.dest('build/images'));
});
