'use strict';

/**
 * Production environment settings
 */
module.exports = {
  name: 'production',

  cdn: {
    one: 'https://assets1.heek.com',
    two: 'https://assets2.heek.com',
    three: 'https://assets3.heek.com',
  },

  site: {
    protocol: 'http://',
    secure: true,
    hostname: 'www.adrien.tech',
    port: '',
  },

  S3: {
    accessKeyId: 'AKIAINSDDM364J437AFA',
    region: 'eu-west-1',
    secretAccessKey: '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',
    sslEnabled: true,
    bucketName: 'elasticbeanstalk-eu-west-1-995892470641',
  },
};
