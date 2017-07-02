/* tslint:disable:next-line: no-invalid-this*/
import { InjectionToken } from '@angular/core';

export interface AppConfig {
  ENV: string;
  PROTOCOL: string;
  DOMAIN: string;
  PORT: string;
  TOKEN?: string;
  URL: () => string;
}

export const APP_CONFIG = new InjectionToken<AppConfig>('app.conf');

export function getUrl() {
  return this.PROTOCOL + this.DOMAIN + (this.PORT ? ':' + this.PORT : '');
}
