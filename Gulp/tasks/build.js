var gulp   = require('gulp');
var gutil  = require('gulp-util');
var ugly = require('gulp-uglify');
var minify = require('gulp-minify-css');
var replace = require('gulp-replace');
var rename = require('gulp-rename');
var newer = require('gulp-newer');

gulp.task('build', function(cb) {

  gulp.src('dest/data/**/*.{json,csv,tsv,txt}')
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
    .pipe(replace(/replaceLanguage/, trad))
    .pipe(replace(/replaceDir/, dir))
    .pipe(newer('build'))
    .pipe(gulp.dest(('build')));

  gulp.src('dest/styles/*.css')
    .pipe(minify())
    .pipe(newer('build/styles'))
    .pipe(gulp.dest('build/styles'));

  gulp.src('dest/styles/fonts/**/*')
    .pipe(newer('build/styles/fonts'))
    .pipe(gulp.dest('build/styles/fonts'));

  gulp.src('dest/images/**/*.{png,jpg,svg}')
    .pipe(newer('build/images'))
    .pipe(gulp.dest('build/images'));
});
