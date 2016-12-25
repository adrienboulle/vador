'use strict';

const gulp = require('gulp');

gulp.task('local', gulp.series([
  'copy:local',
  'linker:local',
]));
