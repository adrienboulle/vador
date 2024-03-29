// tslint:disable:no-console no-invalid-this

'use strict';

const env = process.env.NODE_ENV;
const verbose = process.env.VERBOSE;

const ENV_PRODUCTION = require('./config/env/production.js');
const ENV_LOCAL = require('./config/env/local.js');

const config: any = () => {
  let config: any = {
    env: {},
  };

  switch (env) {
    case ENV_PRODUCTION.name:
      config.env = ENV_PRODUCTION;
      break;
    case ENV_LOCAL.name:
      config.env = ENV_LOCAL;
      break;
    default:
      config.env = ENV_LOCAL;
      break;
  }

  config.env.verbose = verbose === 'true';
  config.env.cdn._index = -1;
  config.env.cdn.getCdn = function () {
    return this[Object.keys(this).filter(function (key: any) {
      return typeof key === 'string';
    })[this._index++ % 3]];
  };

  console.log('Configuration file ' + config.env.name + '.js' + ' loaded');

  return config;
};

export const conf: any = config();
