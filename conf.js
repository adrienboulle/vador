'use strict';

const gutil = require('gulp-util');
const cacheBuster = require('./gulp/cachbusting');

const env = process.env.NODE_ENV || 'development';

const config = (() => {
  const path = require('path');
  const fs = require('fs');

  let config = {
    env: {},
  };

  config.env = require('./config/' + env);
  config.env.name = env;
  config.env.busterSuffix = config.env.name === 'production' ? '.' + cacheBuster() + '.min' : '';;

  gutil.log('Configuration file ' + gutil.colors.green(config.env.name + '.js') + ' loaded');

  return config;
})();

module.exports = config;
