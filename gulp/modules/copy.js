'use strict';

const gulp = require('gulp');

const src = {
  node_modules: {
    base: '.',
    dest: '.build/public',
    prod: [
      'node_modules/core-js/client/shim.min.js',
      'node_modules/zone.js/dist/zone.js',
    ],
    local: [
      'node_modules/core-js/client/shim.min.js',
      'node_modules/zone.js/dist/zone.js',
      'node_modules/systemjs/dist/system.src.js',
      'node_modules/@angular/**/*.umd.js',
      'node_modules/rxjs/**/*.js',
    ],
  },
  html: {
    base: 'src',
    dest: '.build/public',
    prod: [
    ],
    local: [
      'src/**/*.html',
    ],
  },
  ts: {
    base: 'app',
    dest: '.build/public/app',
    prod: [
    ],
    local: [
      'src/**/*.ts',
    ],
  },
  imgs: {
    base: 'src',
    dest: '.build/public',
    prod: [
      'src/imgs/**',
    ],
    local: [
      'src/imgs/**',
    ],
  },
  systemjs: {
    base: 'src',
    dest: '.build/public',
    prod: [
    ],
    local: [
      'src/systemjs.config.app.js',
    ],
  },
};

const copy = env => {
  const promises = [];

  for (let itemName in src) {
    const item = src[itemName];
    const base = item.base;
    const dest = item.dest;
    const files = item[env];

    if (!files || files.length === 0)
      continue;

    promises.push(
      new Promise(r =>
        gulp.src(files, { base: base })
        .pipe(gulp.dest(dest))
        .on('end', r)
      )
    );
  }

  return Promise.all(promises);
};

gulp.task('copy:local', done =>
  copy('local')
  .then(() => done)
);

gulp.task('copy:prod', done =>
  copy('prod')
  .then(() => done)
);
