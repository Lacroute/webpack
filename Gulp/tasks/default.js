var gulp   = require('gulp');
var gutil  = require('gulp-util');
var browserSync     = require('browser-sync').create('DevServer');
var argv   = require('yargs').argv;
var dev_lang = argv.lang;
var watch = require('gulp-watch');
var rseq = require('run-sequence');

gulp.task('default', ['jade', 'others', 'fonts', 'scripts', 'modernizr', 'images', 'datum'], function() {

  // server start
  browserSync.init({
    server: {
      baseDir: "./dest"
    }
  });

  gulp.watch('./src/html/**/*.jade', ['jade', browserSync.reload]);

  gulp.watch(['./src/styles/**/*.{scss,css}', '!.src/styles/fonts/**/*'], ['sass']);

  gulp.watch('./src/scripts/**/*.{js,tag}', ['scripts', browserSync.reload]);

  watch('./src/images/**/*.{png,jpg}', function() {
    gutil.log('change images');
    rseq('images');
  });

  watch('./src/data/'+ dev_lang +'/**/*.{json,csv,tsv,txt}', function() {
    gutil.log('change images');
    rseq('datum', 'jade');
  });

  watch('./src/html/**/*.{json,txt,svg,ico}', function() {
    gutil.log('change others');
    rseq('others');
  });

  watch('./src/styles/fonts/'+ dev_lang +'/*.{eot,svg,ttf,woff,woff2}', function() {
    gutil.log('change others');
    rseq('fonts');
  });

  if (typeof dev_lang === 'undefined') {
    gutil.log(gutil.colors.red('Veuillez indiquer la langue avec la commande "gulp --lang xx-XX"'));
    process.exit();
  }
});
