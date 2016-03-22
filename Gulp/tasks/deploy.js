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
var rename = require('gulp-rename');
var del = require('del');
var argv   = require('yargs').argv;
var dev_lang = argv.lang;

if (typeof argv.lang === 'undefined') {
 return false;
}

var date = new Date();
var month = ((date.getMonth()+1) < 10) ? '0' + (date.getMonth()+1) : date.getMonth()+1;
var hour = ((date.getHours()) < 10) ? '0' + date.getHours() : date.getHours();
var day = ((date.getDate()) < 10) ? '0' + date.getDate() : date.getDate();
var prefix = '' + date.getFullYear() + month + day + '-';
var data = JSON.parse(fs.readFileSync('./src/data/'+ dev_lang +'/lang.json'));
var folder = prefix + data.language + '-' + data.id;
var remotePath = "/var/www/html/builds/" + folder;
var remoteIndex = "/phraseanet/hotfolder/interactiveCollection";
var config = JSON.parse(fs.readFileSync('./config.json'));
var source = {
  headline: data.metadata.headline,
  published: date.getFullYear() + '-' + month + '-' +  day + ' ' + hour + ':' + date.getMinutes(),
  caption: data.metadata.caption,
  language: data.language,
  slugs: data.metadata.keywords.join(' ; '),
  contributors: data.metadata.captionWriter,
  authors: data.metadata.byline,
  cover: folder+'.jpg',
  link: 'https://graphics.afp.com/builds/' + folder
};

// -Aller dans le repertoire /phraseanet/www/Phraseanet
// -Changer d’utilisateur « sudo -u apache /bin/bash »
// -Executer la commande bin/console task:run 5 -vvv

/**
 * [endProcess description] copy generated xml and jpg files in /phraseanet/hotfolder/interactiveCollection
 * @return void
 */
function endProcess() {
  var gulpSSH = new GulpSSH({
    ignoreErrors: false,
    sshConfig: config.phraseaSSH
  });
  return gulpSSH
    .shell(
      ['cd /phraseanet/hotfolder/interactiveCollection', 'chown -R apache: *'], // files must be apache's owned
      {filePath: folder + '-shell.log'}
    )
    .pipe(gulp.dest('./build/logs'))
    .once('end', function() {
      gulpSSH.close();
      gutil.log(" ******************** copy to phrasea OK ************************** ");
      // cleaning
      del('./build/indexation/**', {force: true});
      gutil.log(" ******************** cleaning OK ************************** ");
    });
}
/**
 * [indexationProcess description] sftp copy of generated files on phraseanet server
 * @return void
 */
function indexationProcess() {
  // connect on ssh and copy ./build/indexation/** into phraseanet's hotfolder

  var indexConfig = _.extend(config.phrasea, {"remotePath": remoteIndex, "callback": endProcess});
  return gulp.src('./build/indexation/**/*')
    .pipe(sftp(indexConfig))
    .once('end', function() {
      gutil.log("********************* xml, jpg, sftp OK *************************** ");
    })
}

// chained tasks
gulp.task('xml', function() {
  return gulp.src('./indexation.xml')
    .pipe(getData(function() {
      return {source : source};
    }))
    .pipe(template())
    .pipe(rename(folder + '.xml'))
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

gulp.task('renameJPG', ['screenshot'], function() {
  return gulp.src('./build/indexation/index-640.jpg')
    .pipe(rename(folder + '.jpg'))
    .pipe(gulp.dest('./build/indexation'));
});

gulp.task('delJPG', ['renameJPG'], function() {
  del('./build/indexation/index-640.jpg');
});

// master task
gulp.task('deploy', ['xml', 'delJPG'], function(cb) {
  if (typeof dev_lang === 'undefined') {
    gutil.log(gutil.colors.red('Veuillez indiquer la langue avec la commande "gulp --lang xx-XX"'));
    process.exit();
  }
  var buildsConfig = _.extend(config.sftp, {"remotePath": remotePath, "callback": indexationProcess});
  // initiate copy from build/ to folder named after 'folder' var on distant server
  gutil.log(folder);
  return gulp.src('./build/**/*')
    .pipe(sftp(buildsConfig))
    .once('end', function() {
      gutil.log("********************* graphics sftp OK *************************** ");
    });
});
