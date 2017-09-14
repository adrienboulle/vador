'use strict';

const gulpS3 = require('gulp-s3-upload');

const config = require('../../src/server/config/env/production');

const s3 = gulpS3({
  accessKeyId: config.S3.accessKeyId,
  region: config.S3.region,
  secretAccessKey: config.S3.secretAccessKey,
  sslEnabled: config.S3.sslEnabled,
});

const upload = gulp =>
  Promise.all([
    new Promise((resolve, reject) =>
      gulp.src([
        '.build/public/js/**',
        '.build/public/styles/**',
        '.build/public/imgs/**',
      ], { base: '.build/public' })
      .pipe(s3({
        Bucket: config.S3.bucketName,
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
