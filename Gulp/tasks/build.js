var gulp   = require('gulp');
var gutil  = require('gulp-util');
var ugly = require('gulp-uglify');
var minify = require('gulp-minify-css');
var replace = require('gulp-replace');
var rename = require('gulp-rename');
var argv = require('yargs').argv;
var newer = require('gulp-newer');


var langPack = {
  "fr": {
    "formatters": "dest/data/fr-FR/d3-formatters.json",
    "lang": "dest/data/fr-FR/lang.json",
    "datum": "dest/data/fr-FR/chomage.csv",
    "dir": "ltr"
  },
  "es": {
    "formatters": "dest/data/es-ES/d3-formatters.json",
    "lang": "dest/data/es-ES/lang.json",
    "datum": "dest/data/es-ES/chomage.csv",
    "dir": "ltr"
  }
}

gulp.task('build', function(cb) {

  if (argv.lang === 'fr')
    gutil.log("langue choisie ", gutil.colors.magenta(argv.lang));

  var trad = argv.lang, dir = langPack[trad].dir;

  gulp.src(langPack[trad].lang)
    // .pipe(newer('build/data'))
    .pipe(gulp.dest('build/data'));

  gulp.src(langPack[trad].datum)
    // .pipe(newer('build/data'))
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
