var gulp   = require('gulp');
var gutil  = require('gulp-util');
var bs     = require('browser-sync');
var reload = bs.reload;
var argv   = require('yargs').argv;
var dev_lang = argv.lang;
var watch = require('gulp-watch');



gulp.task('default', ['jade', 'others', 'fonts', 'sass', 'scripts', 'images', 'datum'], function() {

  // server start
  bs.init({
    server: {
      baseDir: "./dest"
    }
  });

  gulp.watch(['./src/images/**/*.{png,jpg}', './src/data/'+ dev_lang +'/**/*.{json,csv,tsv,txt}', './src/html/**/*.{json,txt,svg,ico}', './src/styles/fonts/'+ dev_lang +'/*.{eot,svg,ttf,woff,woff2}'], [bs.reload]); // reload for background tasks purpose

  gulp.watch('./src/html/**/*.jade', ['jade', bs.reload]);

  gulp.watch(['./src/styles/**/*.{scss,css}', '!.src/styles/fonts/**/*'], ['sass', bs.reload]);

  gulp.watch('./src/scripts/**/*.js', ['scripts', bs.reload]);

  watch('./src/images/**/*.{png,jpg}', function() {
    gutil.log('change images');
    gulp.start('images');
  });

  watch('./src/data/'+ dev_lang +'/**/*.{json,csv,tsv,txt}', function() {
    gutil.log('change images');
    gulp.start(['datum', 'jade']);
  });

  watch('./src/html/**/*.{json,txt,svg,ico}', function() {
    gutil.log('change others');
    gulp.start('others');
  });

  watch('./src/styles/fonts/'+ dev_lang +'/*.{eot,svg,ttf,woff,woff2}', function() {
    gutil.log('change others');
    gulp.start('fonts');
  });

  if (typeof dev_lang === 'undefined') {
    gutil.log(gutil.colors.red('Veuillez indiquer la langue avec la commande "gulp --lang xx-XX"'));
    process.exit();
  }
});
