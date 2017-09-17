import { AppConfig, getUrl, getCdn } from './config';

const APP_CONFIG: AppConfig = {
  ENV: 'BASE_DUMMY',
  PROTOCOL: 'http://',
  DOMAIN: 'localhost',
  PORT: '1337',
  URL: getUrl,
  getCdn: getCdn,
};

export const config: AppConfig = APP_CONFIG;
