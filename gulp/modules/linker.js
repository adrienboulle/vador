'use strict';

const gulp = require('gulp');
const linker = require('gulp-linker');

gulp.task('linker:prod', done =>
  gulp.src([
    'templates/**/*.ejs',
  ])
  .pipe(linker({
    scripts: ['.build/public/build/*.min.js'],
    startTag: '<!--SCRIPTS APP-->',
    endTag: '<!--SCRIPTS APP END-->',
    fileTmpl: '<script src="%s"></script>',
    appRoot: '.build/public/',
  }))
  .pipe(gulp.dest('.build/templates/'))
  .on('end', done)
);
