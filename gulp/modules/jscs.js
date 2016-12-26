'use strict';

const gulp = require('gulp');
const jscs = require('gulp-jscs');

gulp.task('lint:js', () =>
  gulp.src([
    '*/**.js',

    '!node_modules/**',
  ])
  .pipe(jscs())
  .pipe(jscs.reporter())
  .pipe(jscs.reporter('fail'))
);
