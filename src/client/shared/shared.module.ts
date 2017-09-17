import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { APP_CONFIG, AppConfig } from './config/config';
import { config } from './config/base.conf';

import { I18n } from './pipes/i18n.pipe';

import { Cdn } from './directives/cdn.directive';

export function configFactory(): AppConfig {
  return config;
}

const imports = [
  CommonModule,
  HttpClientModule,
  FormsModule,
  ReactiveFormsModule,
];

const declarations = [
  I18n,
  Cdn,
];

@NgModule({
  imports: [
    ...imports,
  ],
  providers: [
    { provide: APP_CONFIG, useFactory: configFactory },
  ],
  declarations: [
    ...declarations,
  ],
  exports: [
    ...imports,
    ...declarations,
  ],
})
export class SharedModule {}
