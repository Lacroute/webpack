var gulp   = require('gulp');
var gutil  = require('gulp-util');
var fs = require('fs');
var Q = require('q');
var GulpSSH = require('gulp-ssh');

var date = new Date();
var month = ((date.getMonth()+1) < 10) ? '0' + (date.getMonth()+1) : date.getMonth()+1;
var prefix = '' + date.getFullYear() + month + date.getDate() + '-';

var globs = [
      './build/**'
    ],
    config = JSON.parse(fs.readFileSync('./config')),
    gulpSSH = new GulpSSH({
      ignoreErrors: false,
      sshConfig: config
    });

gulp.task('sftp', function(cb) {
  gutil.log(prefix);
  var data = JSON.parse(fs.readFileSync('./build/data/lang.json'));
  var folder = prefix + data.language + '-' + data.id;

  // initiate copy from build/ to folder named after 'folder' var on distant server
  //
  return gulp.src('./build/**')
    .pipe(gulpSSH.sftp('write', '/var/www/html/builds/' + folder + '/'))
    .on('error', gutil.log);
});
