import { AppConfig, getUrl, getCdn } from './config';

const APP_CONFIG: AppConfig = {
  ENV: 'PRODUCTION',
  PROTOCOL: 'https://',
  DOMAIN: 'www.adrien.tech',
  PORT: '',
  URL: getUrl,
  getCdn: getCdn,
};

export const config: AppConfig = APP_CONFIG;
