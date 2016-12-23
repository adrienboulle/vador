'use strict';

const gutil = require('gulp-util');

const env = process.env.NODE_ENV || 'development';

const config = (() => {
  const path = require('path');
  const fs = require('fs');

  let config = {
    env: {},
  };

  config.env = require('./config/' + env);
  config.env.name = env;

  gutil.log('Configuration file ' + gutil.colors.green(config.env.name + '.js') + ' loaded');

  return config;
})();

module.exports = config;