'use strict';

const inlineTemplate = require('gulp-inline-ng2-template');
const inlineStyles = require('gulp-inline-ng2-styles');

module.exports = {
  templates: gulp => () =>
    gulp.src('.build/private/src/client/**/*.ts')
    .pipe(inlineTemplate({ useRelativePaths: true }))
    .pipe(gulp.dest('.build/private/src/client')),

  styles: gulp => () =>
    gulp.src('.build/private/src/client/**/*.ts')
    .pipe(inlineStyles({ useRelativePaths: true, extension: 'scss' }))
    .pipe(gulp.dest('.build/private/src/client')),
};
