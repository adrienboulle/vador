'use strict';

const gulp = require('gulp');

gulp.task('prod', gulp.series([
  'copy',
  'linker:prod',
]));
