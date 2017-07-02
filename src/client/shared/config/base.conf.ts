import { AppConfig, getUrl } from './config';

const APP_CONFIG: AppConfig = {
  ENV: 'BASE_DUMMY',
  PROTOCOL: 'http://',
  DOMAIN: 'localhost',
  PORT: '9876',
  URL: getUrl,
};

export const config: AppConfig = APP_CONFIG;
