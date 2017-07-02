'use strict';

const gulp = require('gulp');

function loadTask(fileName, taskName) {
  const taskModule = require('./gulp/modules/' + fileName);
  const task = taskName ? taskModule[taskName] : taskModule;

  return task(gulp);
}

gulp.task('lint:ts', loadTask('lint', 'tsLint'));
gulp.task('lint:js', loadTask('lint', 'jsLint'));
gulp.task('lint:scss', loadTask('lint', 'scssLint'));

gulp.task('lint:all', gulp.parallel(['lint:ts', 'lint:js', 'lint:scss']));

