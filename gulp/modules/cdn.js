const gulp = require('gulp');

const gulpS3 = require('gulp-s3-upload');

gulp.task('upload', done => {
  if (config.env.name !== 'production')
    return done();

  const s3 = gulpS3({
    accessKeyId: config.env.s3.accessKeyId,
    region: 'eu-west-1',
    secretAccessKey: config.env.s3.secretAccessKey,
    sslEnabled: true,
  });

  gulp.src(['.build/public/**'], { base: '.build/public' })
  .pipe(s3({
    Bucket: 'elasticbeanstalk-eu-west-1-995892470641',
    ACL: 'public-read',
    CacheControl: 'max-age=86400',
  }, {
    maxRetries: 5,
  }))
  .on('end', done);
});
