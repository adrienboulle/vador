'use strict';

const gulp = require('gulp');

const js = {
  prod: [
    'public/node_modules/core-js/client/shim.min.js',
    'public/node_modules/zone.js/dist/zone.js',
  ],
  'local:public': [
    'public/node_modules/core-js/client/shim.min.js',
    'public/node_modules/zone.js/dist/zone.js',
    'public/node_modules/systemjs/dist/system.src.js',
    'public/node_modules/@angular/**/*.umd.js',
    'public/node_modules/rxjs/**/*.js',
    'public/app.js',
  ],
  'local:app': [
    'app/**/*.html',
    'aot/**/*.js',
  ],
};

const css = {
  prod: [
    'public/styles.css',
  ],
  local: [
    'public/styles.css',
  ],
};

const copyJs = (env, dest = '') => {
  const name = 'copy:js:' + env;

  gulp.task(name, done =>
    gulp.src(js[env], { base: '.' })
    .pipe(gulp.dest('.build' + dest))
    .on('end', done)
  );

  return name;
};

const copyCss = (env, dest = '') => {
  const name = 'copy:css:' + env;

  gulp.task(name, done =>
    gulp.src(css[env], { base: '.' })
    .pipe(gulp.dest('.build' + dest))
    .on('end', done)
  );

  return name;
};

gulp.task('copy:prod',
  gulp.parallel([
    copyJs('prod'),
    copyCss('prod'),
  ])
);

gulp.task('copy:local',
  gulp.parallel([
    copyJs('local:public'),
    copyJs('local:app', '/public'),
    copyCss('local'),
  ])
);
