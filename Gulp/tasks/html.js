var gulp   = require('gulp');
var gutil  = require('gulp-util');
var newer  = require('gulp-newer');
var replace = require('gulp-replace');
var path = require('path');
var jade = require('gulp-jade');
// var html = require('gulp-html-prettify');
var fs = require('fs');
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
var data = JSON.parse(fs.readFileSync('./src/data/' + hashmap[dev_lang].lang + '/lang.json'));
gulp.task('html', function() {
  return gulp.src('./src/html/*.{json,txt,png,ico,xml}')
    .pipe(newer('./dest/'))
    .pipe(gulp.dest('./dest/'));
});

gulp.task('jade', function() {
  console.log("in html.js", dev_lang);
  return gulp.src('./src/html/index.jade')
    .pipe(jade({
      locals: data
    }))
    // .pipe(html({
    //   indent_char: ' ', indent_size: 2
    // }))
    .pipe(replace(/replaceLanguage/, hashmap[dev_lang].lang))
    .pipe(replace(/replaceDir/, hashmap[dev_lang].dir))
    .pipe(gulp.dest('dest/'));
});
