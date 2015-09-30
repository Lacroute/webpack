var gulp   = require('gulp');
var gutil  = require('gulp-util');
var fs = require('fs');
var Q = require('q');
var GulpSSH = require('gulp-ssh');
var sftp = require('gulp-sftp');
var _ = require('lodash');
var localScreenshots = require('gulp-local-screenshots');
var getData = require('gulp-data');
var template = require('gulp-template');

var date = new Date();
var month = ((date.getMonth()+1) < 10) ? '0' + (date.getMonth()+1) : date.getMonth()+1;
var hour = ((date.getHours()) < 10) ? '0' + date.getHours() : date.getHours();
var prefix = '' + date.getFullYear() + month + date.getDate() + '-';
var data = JSON.parse(fs.readFileSync('./build/data/lang.json'));
var folder = prefix + data.language + '-' + data.id;
var remotePath = "/var/www/html/builds/" + folder;
var remoteIndex = "/phraseanet/hotfolder/interactiveCollection";
var config = JSON.parse(fs.readFileSync('./config.json'));
var source = {
  headline: data.metadata.headline,
  published: date.getFullYear() + '-' + month + '-' +  date.getDate() + ' ' + hour + ':' + date.getMinutes(),
  caption: data.metadata.caption,
  language: data.language,
  slugs: data.metadata.keywords.join(' ; '),
  contributors: data.metadata.captionWriter,
  authors: data.metadata.byline,
  link: 'https://graphics.afp.com/builds/' + folder
};

function endProcess() {
  gutil.log(" all ok ");
}
function indexationProcess() {
  gutil.log("xml, jpg, sftp ok");
  // connect on ssh and copy ./build/indexation/** into phraseanet's hotfolder
  var gulpSSH = new gulpSSH(config.phraseaSSH);
  var indexConfig = _.extend(config.sftp, {"remotePath": remoteIndex, "callback": endProcess});
  return gulp.src('./build/indexation/**')
    .pipe(sftp(indexConfig))
    .pipe(
      gulpSSH.shell(
        ['cd /phraseanet/hotfolder/interactiveCollection', 'touch .phraseanet.xml', 'chown -R apache: *'],
        {filePath: 'shell.log'}
      )
    )
    .pipe(gulp.dest('./build/logs'))
    .pipe(gulpSSH.close());
}

gulp.task('xml', function() {
  return gulp.src('./indexation.xml')
    .pipe(getData(function() {
      return {source : source};
    }))
    .pipe(template())
    .pipe(gulp.dest('./build/indexation'));
});

gulp.task('screenshot', function() {
  return gulp.src('build/index.html')
    .pipe(localScreenshots({
      width: ['640'],
      path: 'build/',
      folder: './build/indexation'
    }))
    .pipe(gulp.dest('./build'));
});

gulp.task('deploy', ['screenshot', 'xml'], function(cb) {
  var buildsConfig = _.extend(config.sftp, {"remotePath": remotePath, "callback": indexationProcess});
  // initiate copy from build/ to folder named after 'folder' var on distant server
  gutil.log(folder);
  return gulp.src('./build/**/*')
    .pipe(sftp(buildsConfig));
});
