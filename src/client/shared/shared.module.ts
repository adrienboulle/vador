import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { APP_CONFIG } from './config/config';
import { config } from './config/base.conf';

import { I18n } from './pipes/i18n.pipe';

import { Cdn } from './directives/cdn.directive';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: APP_CONFIG, useValue: config },
  ],
  declarations: [
    I18n,
    Cdn,
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    I18n,
    Cdn,
  ],
})
export class SharedModule {}
