'use strict';

const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const replace = require('gulp-replace');
const stripComments = require('gulp-strip-comments');
const rename = require('gulp-rename');

const cacheBuster = require('../../tools/cacheBuster');

const sharedOptions = {
  sass: {
    precision: 8,
  },
  autoprefixer: {
    browsers: ['last 5 versions', '> 10%'],
  },
};

const options = {
  min: sharedOptions,
  dev: sharedOptions,
};

options.min.sass.outputStyle = 'compressed';

module.exports = {
  dev: gulp => () =>
    gulp.src('assets/styles/styles.scss')
    .pipe(sourcemaps.init())
    .pipe(sassGlob())
    .pipe(sass(options.local).on('error', sass.logError))
    .pipe(autoprefixer(options.autoprefixer))
    .pipe(replace('[[cache]]', cacheBuster))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('.build/public/styles/')),

  min: gulp => () =>
    gulp.src('assets/styles/styles.scss')
    .pipe(sassGlob())
    .pipe(sass(options.prod).on('error', sass.logError))
    .pipe(autoprefixer(options.autoprefixer))
    .pipe(stripComments.text())
    .pipe(replace('[[cache]]', cacheBuster))
    .pipe(rename(path => {
      path.basename = cacheBuster + path.basename.substring(4) + '.min';

      return path;
    }))
    .pipe(gulp.dest('.build/public/styles/')),
};
