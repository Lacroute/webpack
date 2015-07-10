var gulp   = require('gulp');
var gutil  = require('gulp-util');
var bs     = require('browser-sync');
var reload = bs.reload;
var argv   = require('yargs').argv;
var dev_lang = argv.lang;

gulp.task('default', ['others', 'html', 'fonts', 'sass', 'scripts', 'images', 'datum'], function() {

  // server start
  bs.init({
    server: {
      baseDir: "./dest"
    }
  });

  gulp.watch('./src/html/**/*.{json,txt,svg,ico}', ['others', bs.reload]);
  gulp.watch('./src/styles/fonts/'+ dev_lang +'/*.{eot,svg,ttf,woff}', ['fonts', bs.reload]);
  gulp.watch(['./src/styles/**/*.{scss,css}', '!.src/styles/fonts/**/*'], ['sass', bs.reload]);
  gulp.watch('./src/scripts/**/*.js', ['scripts', bs.reload]);
  gulp.watch('./src/html/**/*.html', ['html', bs.reload]);
  gulp.watch('./src/images/**/*.{png,jpg}', ['images', bs.reload]);
  gulp.watch('./src/data/'+ dev_lang +'/**/*.{json,csv,tsv,txt}', ['datum', bs.reload]);

  if (typeof dev_lang === 'undefined') {
    gutil.log(gutil.colors.red('Veuillez indiquer la langue avec la commande "gulp --lang xx-XX"'));
    process.exit();
  }
});
