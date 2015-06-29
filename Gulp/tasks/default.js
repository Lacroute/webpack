var gulp   = require('gulp');
var gutil  = require('gulp-util');
var bs     = require('browser-sync');
var reload = bs.reload;

gulp.task('default', ['others', 'html', 'fonts', 'sass', 'scripts', 'images', 'datum'], function() {
  // server start
  bs.init({
    server: {
      baseDir: "./dest"
    }
  });
  gulp.watch('./src/html/**/*.{json,txt,svg,ico}', ['others', bs.reload]);
  gulp.watch('./src/styles/fonts/**/*.{eot,svg,ttf,woff}', ['fonts', bs.reload]);
  gulp.watch(['./src/styles/**/*.{scss,css}', '!.src/styles/fonts/**/*'], ['sass', bs.reload]);
  gulp.watch('./src/scripts/**/*.js', ['scripts', bs.reload]);
  gulp.watch('./src/html/**/*.html', ['html', bs.reload]);
  gulp.watch('./src/images/**/*.{png,jpg}', ['images', bs.reload]);
  gulp.watch('./src/data/**/*.{json,csv,tsv,txt}', ['datum', bs.reload]);
});
