'use strict';

const gulp = require('gulp');

gulp.task('prod', gulp.parallel([
  'linker:prod',
  'copy',
]));
