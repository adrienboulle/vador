'use strict';

const gulp = require('gulp');

gulp.task('prod', gulp.parallel([
  'clean:prod',
  gulp.series([
    'copy:prod',
    'sass:prod',
    'linker:prod',
  ]),
]));
