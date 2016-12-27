'use strict';

const gulp = require('gulp');

gulp.task('lint', gulp.parallel([
  'lint:js',
  'lint:ts',
]));
