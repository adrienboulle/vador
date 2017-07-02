import { AppConfig, getUrl } from './config';

const APP_CONFIG: AppConfig = {
  ENV: 'PRODUCTION',
  PROTOCOL: 'https://',
  DOMAIN: 'www.adrienboulle.com',
  PORT: '',
  URL: getUrl,
};

export const config: AppConfig = APP_CONFIG;
