'use strict';

const gulp = require('gulp');
const tslint = require('gulp-tslint');

gulp.task('lint:ts', () =>
  gulp.src([
    'src/app/**/*.ts',
  ])
  .pipe(tslint({
    formatter: 'verbose',
  }))
  .pipe(tslint.report())
);
