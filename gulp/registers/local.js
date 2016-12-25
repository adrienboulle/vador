'use strict';

const gulp = require('gulp');
const nodemon = require('gulp-nodemon');

const WATCH_INTERVAL = 1000;

gulp.task('watch', done => {
  /**
   * Watch Templates
   */
  gulp.watch([
    'templates/**/*.ejs',
    'app/**/*.html',
  ], { interval: WATCH_INTERVAL }, gulp.series([
    'copy:local',
    'linker:local',
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
    'copy:local',
    'linker:local',
    'watch',
  ])
);
