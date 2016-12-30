const gulp = require('gulp');
const run = require('gulp-run');

gulp.task('compile', done =>
  run('tsc').exec(done)
);
