import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { APP_CONFIG } from './config/config';
import { config } from './config/base.conf';

import { I18n } from './pipes/i18n.pipe';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: APP_CONFIG, useValue: config },
  ],
  declarations: [
    I18n,
  ],
  exports: [
    CommonModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    I18n,
  ],
})
export class SharedModule {}
