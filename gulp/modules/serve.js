'use strict';

const nodemon = require('gulp-nodemon');

module.exports = {
  local: gulp => () => {
    const stream = nodemon({
      delay: '2000',
      script: '.build/private/src/server/index.js',
    });

    gulp.watch(['assets/styles/**/*.scss'], gulp.series(['sass:dev']));

    gulp.watch(['src/client/**/*.ts', 'src/client/**/*.html'], gulp.series('scripts:ts', done => {
      stream.emit('restart');
      done();
    }));
  },
};
