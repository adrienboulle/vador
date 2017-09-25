'use strict';

const linker = require('gulp-linker');

let cdn1 = '';
let cdn2 = '';
let cdn3 = '';
let withCdn = false;

if (process.env.NODE_ENV === 'production') {
  withCdn = true;
  const config = require('../../src/server/config/env/production');
  cdn1 = config.cdn.one;
  cdn2 = config.cdn.two;
  cdn3 = config.cdn.three;
}

const linkJs = gulp =>
  gulp.src([
    '.build/private/src/views/**/*ejs',
  ])
  .pipe(linker({
    scripts: [
      '.build/public/js/polyfills-*.js',
    ],
    startTag: '<!--SCRIPTS POLYFILLS-->',
    endTag: '<!--SCRIPTS POLYFILLS END-->',
    fileTmpl: '<script src="' + cdn1 + '/%s"></script>',
    appRoot: '.build/public/',
  }))
  .pipe(linker({
    scripts: [
      '.build/public/js/home-*.js',
    ],
    startTag: '<!--SCRIPTS HOME-->',
    endTag: '<!--SCRIPTS HOME END-->',
    fileTmpl: '<script src="' + cdn2 + '/%s"></script>',
    appRoot: '.build/public/',
  }))
  .pipe(linker({
    scripts: [
      '.build/public/js/contact-*.js',
    ],
    startTag: '<!--SCRIPTS CONTACT-->',
    endTag: '<!--SCRIPTS CONTACT END-->',
    fileTmpl: '<script src="' + cdn2 + '/%s"></script>',
    appRoot: '.build/public/',
  }))
  .pipe(linker({
    scripts: [
      '.build/public/js/skills-*.js',
    ],
    startTag: '<!--SCRIPTS SKILLS-->',
    endTag: '<!--SCRIPTS SKILLS END-->',
    fileTmpl: '<script src="' + cdn2 + '/%s"></script>',
    appRoot: '.build/public/',
  }))
  .pipe(linker({
    scripts: [
      '.build/public/js/ajs-*.js',
      '.build/public/js/typescriptServices.js',
    ],
    startTag: '<!--SCRIPTS AJS-->',
    endTag: '<!--SCRIPTS AJS END-->',
    fileTmpl: '<script src="' + cdn2 + '/%s"></script>',
    appRoot: '.build/public/',
  }))
  .pipe(linker({
    scripts: [
      '.build/public/js/typescriptServices.js',
    ],
    startTag: '<!--SCRIPT TSSERVICES-->',
    endTag: '<!--SCRIPT TSSERVICES END-->',
    fileTmpl: '<script src="' + cdn2 + '/%s"></script>',
    appRoot: '.build/public/',
  }))
  .pipe(linker({
    scripts: [
      '.build/public/js/node_modules/systemjs/dist/system.src.js',
      '.build/public/js/node_modules/core-js/client/core.min.js',
      '.build/public/js/node_modules/reflect-metadata/Reflect.js',
      '.build/public/js/node_modules/zone.js/dist/zone.min.js',
      '.build/public/js/systemjs.config.app.js',
    ],
    startTag: '<!--SCRIPTS SYSTEMJS APP-->',
    endTag: '<!--SCRIPTS SYSTEMJS APP END-->',
    fileTmpl: '<script src="' + cdn3 + '/%s"></script>',
    appRoot: '.build/public/',
  }))
  .pipe(gulp.dest('.build/private/src/views'));

const linkStyles = gulp =>
  gulp.src([
    '.build/private/src/views/**/*ejs',
  ])
  .pipe(linker({
    scripts: [
      '.build/public/styles/*.css',
    ],
    startTag: '<!--STYLES-->',
    endTag: '<!--STYLES END-->',
    fileTmpl: '<link rel="stylesheet" href="' + cdn1 + '/%s">',
    appRoot: '.build/public/',
  }))
  .pipe(linker({
    scripts: [
      '.build/public/styles/codemirror.css',
    ],
    startTag: '<!--STYLES CODEMIRROR-->',
    endTag: '<!--STYLES CODEMIRROR END-->',
    fileTmpl: '<link rel="stylesheet" href="' + cdn2 + '/%s">',
    appRoot: '.build/public/',
  }))
  .pipe(gulp.dest('.build/private/src/views'));

module.exports = {
  js: gulp => () => linkJs(gulp),
  styles: gulp => () => linkStyles(gulp),
};
