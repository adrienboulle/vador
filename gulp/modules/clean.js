'use strict';

const gulp = require('gulp');
var clean = require('gulp-clean');

const src = {
  '.aot': {
    prod: [
      '.aot',
      'src/app/**/*.js',
      'src/app/**/*.js.map',
    ],
    local: [
    ],
  },
};

gulp.task('clean:prod', done =>
  gulp.src(src['.aot'].prod, { read: false })
  .pipe(clean())
  .on('end', done)
);
