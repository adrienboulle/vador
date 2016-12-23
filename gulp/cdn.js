const gulp = require('gulp');

const s3 = require('gulp-s3-upload')({
  accessKeyId: 'AKIAIRAGMY55262VTXGA',
  region: 'eu-west-1',
  secretAccessKey: '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',
  sslEnabled: true,
});

gulp.task('upload:build', () =>
  gulp.src(['public/build/*.js'])
  .pipe(s3({
    Bucket: 'elasticbeanstalk-eu-west-1-995892470641',
    ACL: 'public-read',
    CacheControl: 'max-age=86400',
  }, {
    maxRetries: 5,
  }))
);
