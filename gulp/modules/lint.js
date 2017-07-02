const gutil = require('gulp-util');
const tslint = require('gulp-tslint');
const jscs = require('gulp-jscs');
const scsslint = require('gulp-scss-lint');

const excluded = [
  '!.build',
  '!node_modules',
];

const tsLint = gulp =>
  new Promise(resolve => {
    gulp.src([
      'src/**/*.ts',
      ...excluded,
    ])
    .pipe(tslint({
      formatter: 'verbose',
    }))
    .pipe(tslint.report())
    .on('end', () => {
      gutil.log(gutil.colors.green('tsLint ✔'));
      resolve();
    })
    .on('error', e => {
      gutil.log(e);
      resolve();
    });
  });

const jsLint = gulp =>
  gulp.src([
    '**/*.js',
    ...excluded,
  ])
  .pipe(jscs())
  .pipe(jscs.reporter())
  .on('end', () => {
    gutil.log(gutil.colors.green('jsLint ✔'));
  });

const scssLint = gulp =>
  gulp.src(['assets/styles/styles.scss'])
  .pipe(scsslint({
    config: 'scsslint.yml',
  }))
  .pipe(scsslint.failReporter())
  .on('end', () => {
    gutil.log(gutil.colors.green('scssLint ✔'));
  })
  .on('error', gutil.log);

module.exports = {
  tsLint: gulp => () => tsLint(gulp),
  jsLint: gulp => () => jsLint(gulp),
  scssLint: gulp => () => scssLint(gulp),
};
