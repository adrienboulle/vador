'use strict';

const gulp = require('gulp');
const linker = require('gulp-linker');

const config = require('../../conf');

const prefixOne = config.env.name === 'production' ? config.env.server.protocol + config.env.cdn.one : '';
const prefixTwo = config.env.name === 'production' ? config.env.server.protocol + config.env.cdn.two : '';
const prefixThree = config.env.name === 'production' ? config.env.server.protocol + config.env.cdn.three : '';

gulp.task('linker:prod', done =>
  gulp.src([
    'templates/**/*.ejs',
  ])
  .pipe(linker({
    scripts: [
      '.build/public/build/*.min.js',
    ],
    startTag: '<!--SCRIPTS APP-->',
    endTag: '<!--SCRIPTS APP END-->',
    fileTmpl: '<script  src="' + prefixOne + '/%s"></script>',
    appRoot: '.build/public/',
  }))
  .pipe(linker({
    scripts: [
      '.build/public/node_modules/core-js/client/shim.min.js',
      '.build/public/node_modules/zone.js/dist/zone.js',
    ],
    startTag: '<!--SCRIPTS DEP-->',
    endTag: '<!--SCRIPTS DEP END-->',
    fileTmpl: '<script src="' + prefixTwo + '/%s"></script>',
    appRoot: '.build/public/',
  }))
  .pipe(linker({
    scripts: [
      '.build/public/styles/*.min.css',
    ],
    startTag: '<!--STYLES APP-->',
    endTag: '<!--STYLES APP END-->',
    fileTmpl: '<link rel="stylesheet" href="%s">',
    appRoot: '.build/public/',
  }))
  .pipe(gulp.dest('.build/templates/'))
  .on('end', done)
);


gulp.task('linker:local', done =>
  gulp.src([
    'templates/**/*.ejs',
  ])
  .pipe(linker({
    scripts: [
      '.build/public/app.js',
    ],
    startTag: '<!--SCRIPTS APP HEAD-->',
    endTag: '<!--SCRIPTS APP HEAD END-->',
    fileTmpl: '<script  src="%s"></script>',
    appRoot: '.build/public/',
  }))
  .pipe(linker({
    scripts: [
      '.build/public/node_modules/core-js/client/shim.min.js',
      '.build/public/node_modules/zone.js/dist/zone.js',
      '.build/public/node_modules/systemjs/dist/system.src.js',
    ],
    startTag: '<!--SCRIPTS DEP-->',
    endTag: '<!--SCRIPTS DEP END-->',
    fileTmpl: '<script src="' + prefixTwo + '/%s"></script>',
    appRoot: '.build/public/',
  }))
  .pipe(linker({
    scripts: [
      '.build/public/styles/styles.css',
    ],
    startTag: '<!--STYLES APP-->',
    endTag: '<!--STYLES APP END-->',
    fileTmpl: '<link rel="stylesheet" href="%s">',
    appRoot: '.build/public/',
  }))
  .pipe(gulp.dest('.build/templates/'))
  .on('end', done)
);
