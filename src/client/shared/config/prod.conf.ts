import { AppConfig, getUrl } from './config';

const APP_CONFIG: AppConfig = {
  ENV: 'PRODUCTION',
  PROTOCOL: 'http://',
  DOMAIN: 'www.adrien.tech',
  PORT: '',
  URL: getUrl,
};

export const config: AppConfig = APP_CONFIG;
