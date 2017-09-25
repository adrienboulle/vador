'use strict';

const keys = require('/Users/adboul/.keys');

/**
 * Production environment settings
 */
module.exports = {
  name: 'production',

  port: 80,

  // cdn: {
  //   one: 'https://assets1.adrien.tech',
  //   two: 'https://assets1.adrien.tech',
  //   three: 'https://assets1.adrien.tech',
  // },

  cdn: {
    one: 'https://dh89v9bcbx864.cloudfront.net', // TODO use assets1
    two: 'https://dh89v9bcbx864.cloudfront.net', // TODO use assets2
    three: 'https://dh89v9bcbx864.cloudfront.net', // TODO use assets3
  },

  site: {
    protocol: 'https://',
    secure: true,
    hostname: 'www.adrien.tech',
    port: '',
  },

  S3: {
    accessKeyId: keys.accessKeyId,
    region: 'eu-west-1',
    secretAccessKey: keys.secretAccessKey,
    sslEnabled: true,
    bucketName: 'elasticbeanstalk-eu-west-1-995892470641',
  },
};
