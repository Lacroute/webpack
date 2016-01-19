var gulp   = require('gulp');
var gutil  = require('gulp-util');
var ugly = require('gulp-uglify');
var minify = require('gulp-cssnano');
var sass = require('gulp-ruby-sass');
var prefix = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var newer = require('gulp-newer');
var replaceHTML = require('gulp-html-replace');
var concat = require('gulp-concat');
var sort = require('gulp-sort');
var jade = require('gulp-jade');
var fs = require('fs');
var replace = require('gulp-replace');
var argv   = require('yargs').argv;
var dev_lang = argv.lang;
var hashmap = {
  "fr-FR": {
    lang: "fr-FR",
    dir: "ltr"
  },
  "en-EN": {
    lang: "en-EN",
    dir: "ltr"
  },
  "de-DE": {
    lang: "de-DE",
    dir: "ltr"
  },
  "es-ES": {
    lang: "es-ES",
    dir: "ltr"
  },
  "pt-PT": {
    lang: "pt-PT",
    dir: "ltr"
  },
  "ar-AR": {
    lang: "ar-AR",
    dir: "rtl"
  }
};
gulp.task('build', ['sortJs'], function(cb) {

  gulp.src('./src/data/'+ dev_lang +'/*.{jst,json,csv,tsv,txt,xml}')
    .pipe(newer('build/data'))
    .pipe(gulp.dest('build/data'));

  gulp.src('./src/scripts/vendor/modernizr.custom.55890.js')
    .pipe(ugly())
    .pipe(gulp.dest('build/scripts/vendor'));

  gulp.src('./src/html/*.{json,txt,md,xml,ico,png}')
    .pipe(newer('build'))
    .pipe(gulp.dest(('build')));

  var data = JSON.parse(fs.readFileSync('./src/data/' + hashmap[dev_lang].lang + '/lang.json'));
  gulp.src(['./src/html/index.jade', './src/html/styles.jade'])
    .pipe(jade({
      locals: data
    }))
    .pipe(replace(/replaceLanguage/, hashmap[dev_lang].lang))
    .pipe(replace(/replaceDir/, hashmap[dev_lang].dir))
    .pipe(replaceHTML({js: 'scripts/all.js'}))
    .pipe(newer('build'))
    .pipe(gulp.dest(('build')));

  sass('./src/styles/styles.scss', {sourcemap: false})
  .pipe(prefix("last 1 version", "> 1%", "ie 8", "ie 7"))
  .pipe(minify())
  .pipe(gulp.dest('./build/styles'));


  gulp.src('./src/styles/fonts/'+ dev_lang +'/*')
    .pipe(newer('build/styles/fonts'))
    .pipe(gulp.dest('build/styles/fonts'));

  gulp.src('./src/images/**/*.{png,jpg,svg}')
    .pipe(newer('build/images'))
    .pipe(gulp.dest('build/images'));

  if (typeof dev_lang === 'undefined') {
    gutil.log(gutil.colors.red('Veuillez indiquer la langue avec la commande "gulp --lang xx-XX"'));
    process.exit();
  }
});

gulp.task('sortJs', function() {
  return gulp.src(['./src/scripts/**/*.js', '!./scr/scripts/vendor/modernizr.custom.55890.js'])
    .pipe(sort({
      comparator: function(file1, file2) {
        if (file1.path.indexOf('.min.') > -1)
          return -1;
        if (file2.path.indexOf('.min.') > -1)
          return 1;
        return 0;
      }
    }))
    .pipe(concat('all.js'))
    .pipe(ugly())
    .pipe(gulp.dest('./build/scripts'));
})
