var gulp   = require('gulp');
var gutil  = require('gulp-util');
var browserSync     = require('browser-sync').create('DevServer');
var argv   = require('yargs').argv;
var dev_lang = argv.lang;

gulp.task('default', ['changedDatas', 'others', 'fonts', 'sass', 'scripts', 'modernizr', 'images'], function() {

  // server start
  browserSync.init({
    server: {
      baseDir: "./dest"
    }
  });

  gulp.watch('./src/html/**/*.jade', ['jade', browserSync.reload]);

  gulp.watch(['./src/styles/**/*.{scss,css}', '!.src/styles/fonts/**/*'], ['sass']);

  gulp.watch('./src/scripts/**/*.js', ['scripts', browserSync.reload]);

  watch('./src/images/**/*.{png,jpg,svg}', ['images', browserSync.reload]);

  watch('./src/data/'+ dev_lang +'/**/*.{json,csv,tsv,txt}', ['changedDatas', browserSync.reload]);

  watch('./src/html/**/*.{json,txt,svg,ico}', ['others', browserSync.reload]);

  watch('./src/styles/fonts/'+ dev_lang +'/*.{eot,svg,ttf,woff,woff2}', ['fonts', browserSync.reload]);

  if (typeof dev_lang === 'undefined') {
    gutil.log(gutil.colors.red('Veuillez indiquer la langue avec la commande "gulp --lang xx-XX"'));
    process.exit();
  }
});
