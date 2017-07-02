'use strict';

const gulp = require('gulp');
const gulpS3 = require('gulp-s3-upload');

const config = require('../../src/server/config/env/production');

const s3 = gulpS3({
  accessKeyId: config.S3.accessKeyId,
  region: 'eu-west-1',
  secretAccessKey: config.S3.secretAccessKey,
  sslEnabled: true,
});

const upload = gulp =>
  Promise.all([
    new Promise((resolve, reject) =>
      gulp.src(['.build/public/js/**', '.build/public/styles/**'], { base: '.build/public' })
      .pipe(s3({
        Bucket: 'elasticbeanstalk-eu-west-1-995892470641',
        ACL: 'public-read',
        CacheControl: 'max-age=2628000,public',
      }, {
        maxRetries: 5,
      }))
      .on('end', resolve)
    ),
  ]);

module.exports = {
  production: gulp => () => upload(gulp),
};
