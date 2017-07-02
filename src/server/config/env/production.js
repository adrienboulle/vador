'use strict';

/**
 * Production environment settings
 */
module.exports = {
  name: 'production',

  cdn: {
    one: 'http://adrien.tech.com', // TODO: HTTPS
    two: 'http://adrien.tech.com', // TODO: HTTPS
    three: 'http://adrien.tech.com', // TODO: HTTPS
  },

  site: {
    protocol: 'http://',
    secure: false,
    hostname: 'www.adrien.tech',
    port: '',
  },

  S3: {
    accessKeyId: 'AKIAJ6MV6YREB44OKFHQ',
    region: 'eu-west-1',
    secretAccessKey: '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',
    sslEnabled: true,
    bucketName: 'elasticbeanstalk-eu-west-1-995892470641',
  },
};
