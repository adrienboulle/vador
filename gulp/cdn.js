const gulp = require('gulp');

const s3 = require('gulp-s3-upload')({
  accessKeyId: 'accessKeyId',
  region: 'eu-west-1',
  secretAccessKey: 'secretAccessKey',
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
