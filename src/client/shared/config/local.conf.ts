import { AppConfig, getUrl, getCdn } from './config';

const APP_CONFIG: AppConfig = {
  ENV: 'DEV',
  PROTOCOL: 'http://',
  DOMAIN: 'localhost',
  PORT: '9876',
  URL: getUrl,
  getCdn: getCdn,
};

export const config: AppConfig = APP_CONFIG;
