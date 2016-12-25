'use strict';

const gulp = require('gulp');

gulp.task('copy:dep', done =>
  gulp.src([
    'node_modules/core-js/client/shim.min.js',
    'node_modules/zone.js/dist/zone.js',
  ], { base: '.' })
  .pipe(gulp.dest('.build/public'))
  .on('end', done)
);

gulp.task('copy:style', done =>
  gulp.src([
    'public/styles.css',
  ], { base: '.' })
  .pipe(gulp.dest('.build'))
  .on('end', done)
);

gulp.task('copy',
  gulp.parallel([
    'copy:dep',
    'copy:style',
  ])
);
