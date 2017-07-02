'use strict';

const gulp = require('gulp');
const linker = require('gulp-linker');

let cdn1 = '';
let cdn2 = '';
let cdn3 = '';
let withCdn = false;

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
  withCdn = true;
  const cfg = require('../../src/server/config/env/' + process.env.NODE_ENV);
  cdn1 = cfg.cdn.one;
  cdn2 = cfg.cdn.two;
  cdn3 = cfg.cdn.three;
}

gulp.task('linker:prod', done =>
  gulp.src([
    'src/templates/**/*.ejs',
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
    fileTmpl: '<link rel="stylesheet" href="' + prefixThree + '/%s">',
    appRoot: '.build/public/',
  }))
  .pipe(gulp.dest('.build/templates/'))
  .on('end', done)
);

gulp.task('linker:local', done =>
  gulp.src([
    'src/templates/**/*.ejs',
  ])
  .pipe(linker({
    scripts: [
      '.build/public/systemjs.config.app.js',
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
    fileTmpl: '<script src="%s"></script>',
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

const linkJs = gulp =>
  gulp.src([
    '.build/src/views/**/*ejs',
  ])
  .pipe(linker({
    scripts: [
      '.build/public/build/*.min.js',
    ],
    startTag: '<!--SCRIPTS APP-->',
    endTag: '<!--SCRIPTS APP END-->',
    fileTmpl: '<script  src="' + prefixOne + '/%s"></script>',
    appRoot: '.build/src/views/',
  }));

module.exports = {
  js: gulp => () => linkJs(gulp),
};
