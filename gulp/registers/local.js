'use strict';

const gulp = require('gulp');
const nodemon = require('gulp-nodemon');

const WATCH_INTERVAL = 1000;

gulp.task('watch', done => {
  /**
   * Watch ts
   */
  gulp.watch([
    'src/app/**/*.ts',
    'src/**/*.html',
  ], { interval: WATCH_INTERVAL }, gulp.series([
    'compile',
    'copy:local',
  ]));

  /**
   * Watch Templates
   */
  gulp.watch([
    'templates/**/*.ejs',
  ], { interval: WATCH_INTERVAL }, gulp.series([
    'copy:local',
    'linker:local',
  ]));

  /**
   * Watch Styles
   */
  gulp.watch([
    'src/**/*.scss',
  ], { interval: WATCH_INTERVAL }, gulp.series([
    'sass:local',
  ]));

  nodemon({
    script: './server.js',
    ext: 'js',
  }).on('restart', () => {
    console.log('Autoreloaded');
  });

  done();
});

gulp.task('local',
  gulp.series([
    'compile',
    'copy:local',
    'sass:local',
    'linker:local',
    'watch',
  ])
);
