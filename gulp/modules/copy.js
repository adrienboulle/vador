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

gulp.task('copy:node_modules:prod', done =>
  gulp.src(src.node_modules.prod, { base: '.' })
  .pipe(gulp.dest('.build/public'))
  .on('end', done)
);

gulp.task('copy:node_modules:local', done =>
  gulp.src(src.node_modules.local, { base: '.' })
  .pipe(gulp.dest('.build/public'))
  .on('end', done)
);

gulp.task('copy:html:prod', done =>
  gulp.src(src.html.prod, { base: 'src' })
  .pipe(gulp.dest('.build/public'))
  .on('end', done)
);

gulp.task('copy:html:local', done =>
  gulp.src(src.html.local, { base: 'src' })
  .pipe(gulp.dest('.build/public'))
  .on('end', done)
);

gulp.task('copy:ts:prod', done =>
  gulp.src(src.ts.prod, { base: 'app' })
  .pipe(gulp.dest('.build/public/app'))
  .on('end', done)
);

gulp.task('copy:ts:local', done =>
  gulp.src(src.ts.local, { base: 'app' })
  .pipe(gulp.dest('.build/public/app'))
  .on('end', done)
);

gulp.task('copy:systemjs:prod', done =>
  gulp.src(src.systemjs.prod, { base: 'src' })
  .pipe(gulp.dest('.build/public'))
  .on('end', done)
);

gulp.task('copy:systemjs:local', done =>
  gulp.src(src.systemjs.local, { base: 'src' })
  .pipe(gulp.dest('.build/public'))
  .on('end', done)
);

gulp.task('copy:prod', done => {
  const promises = [];

  for (let itemName in src) {
    const item = src[itemName];
    const base = item.base;
    const dest = item.dest;
    const files = item.prod;

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

  Promise.all(promises)
  .then(() => done());
});

gulp.task('copy:local', done => {
  const promises = [];

  for (let itemName in src) {
    const item = src[itemName];
    const base = item.base;
    const dest = item.dest;
    const files = item.local;

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

  Promise.all(promises)
  .then(() => done());
});
