'use strict';

if (process.env.NODE_ENV === 'production')
  return;

const gulp = require('gulp');
const jscs = require('gulp-jscs');

gulp.task('lint:js', () =>
  gulp.src([
    '*/**.js',

    '!app/**/*',
    '!public/node_modules/**/*',
    '!node_modules/**/*',
  ])
  .pipe(jscs())
  .pipe(jscs.reporter())
  .pipe(jscs.reporter('fail'))
);
