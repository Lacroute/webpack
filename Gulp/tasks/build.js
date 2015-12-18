var gulp   = require('gulp');
var gutil  = require('gulp-util');
var ugly = require('gulp-uglify');
var minify = require('gulp-minify-css');
var sass = require('gulp-ruby-sass');
var prefix = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var newer = require('gulp-newer');
var replace = require('gulp-html-replace');
var concat = require('gulp-concat');
var sort = require('gulp-sort');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

// gulp.task('build', ['sortJs'], function(cb) {
gulp.task('build', function(cb) {
  gulp.src('dest/data/**/*.{jst,json,csv,tsv,txt}')
    .pipe(newer('build/data'))
    .pipe(gulp.dest('build/data'));

  gulp.src('dest/scripts/vendor/modernizr.custom.*')
    .pipe(ugly())
    .pipe(gulp.dest('build/scripts/vendor'));

  // gulp.src(['src/scripts/**/*.js', '!scr/scripts/vendor/modernizr.custom.55890.js'])
  //   .pipe(concat('all.js'))
  //   .pipe(ugly())
  //   .pipe(newer('build/scripts'))
  //   .pipe(gulp.dest('build/scripts'));

  gulp.src('dest/*.{json,txt,md,xml,ico,png}')
    .pipe(newer('build'))
    .pipe(gulp.dest(('build')));

  gulp.src('dest/index.html')
    // .pipe(replace({js: 'scripts/all.js'}))
    .pipe(newer('build'))
    .pipe(gulp.dest(('build')));

  sass('./src/styles/styles.scss', {sourcemap: false})
  .pipe(prefix("last 1 version", "> 1%", "ie 8", "ie 7"))
  .pipe(minify())
  .pipe(gulp.dest('./build/styles'));


  gulp.src('dest/styles/fonts/**/*')
    .pipe(newer('build/styles/fonts'))
    .pipe(gulp.dest('build/styles/fonts'));

  gulp.src('dest/images/**/*.{png,jpg,svg}')
    .pipe(newer('build/images'))
    .pipe(gulp.dest('build/images'));

  gulp.src('./dest/scripts/bundle.js')
    .pipe(ugly())
    .pipe(gulp.dest('./build/scripts'));
});

// gulp.task('sortJs', function() {
//   return gulp.src(['./src/scripts/**/*.js', '!./scr/scripts/vendor/modernizr.custom.55890.js'])
//     .pipe(sort({
//       comparator: function(file1, file2) {
//         if (file1.path.indexOf('.min.') > -1)
//           return -1;
//         if (file2.path.indexOf('.min.') > -1)
//           return 1;
//         return 0;
//       }
//     }))
//     .pipe(concat('all.js'))
//     .pipe(ugly())
//     .pipe(gulp.dest('./build/scripts'));
// })
