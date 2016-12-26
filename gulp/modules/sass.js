'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const stripComments = require('gulp-strip-comments');

const cacheBuster = require('../../gulp/modules/cachbusting');

const options = {
  sass: {
    precision: 8,
    outputStyle: 'compressed',
  },
  autoprefixer: {
    browsers: ['last 5 versions', '> 10%'],
  },
};

gulp.task('sass:local', () =>
  gulp.src('src/styles/*.scss')
  .pipe(sourcemaps.init())
  .pipe(sassGlob())
  .pipe(sass(options.sass).on('error', sass.logError))
  .pipe(autoprefixer(options.autoprefixer))
  .pipe(stripComments.text())
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('.build/public/styles/'))
);

gulp.task('sass:prod', () =>
  gulp.src('src/styles/*.scss')
  .pipe(sassGlob())
  .pipe(sass(options.sass).on('error', sass.logError))
  .pipe(autoprefixer(options.autoprefixer))
  .pipe(stripComments.text())
  .pipe(rename(path => {
    path.basename = cacheBuster() + '.min' + path.basename.substring(6);

    return path;
  }))
  .pipe(gulp.dest('.build/public/styles'))
);
