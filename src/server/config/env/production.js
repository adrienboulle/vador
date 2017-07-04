'use strict';

const fs = require('fs');
const keys = require('/Users/adboul/.keys');

/**
 * Production environment settings
 */
module.exports = {
  name: 'production',

  port: 80,

  cdn: {
    one: 'https://assets1.adrien.tech',
    two: 'https://assets1.adrien.tech',
    three: 'https://assets1.adrien.tech',
  },

  site: {
    protocol: 'https://',
    secure: true,
    hostname: 'www.adrien.tech',
    port: '',
  },

  S3: {
    accessKeyId: keys[0],
    region: 'eu-west-1',
    secretAccessKey: keys[1],
    sslEnabled: true,
    bucketName: 'elasticbeanstalk-eu-west-1-995892470641',
  },
};
