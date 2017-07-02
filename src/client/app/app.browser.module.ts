import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { Router, Event, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';

import { AppModule } from './app.module';

import { AppComponent } from './app.component';

import { getPageData } from '../../server/tools/MetaHelper';

import { LangService } from '../shared/services/lang.service';

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({
      appId: 'app',
    }),
    AppModule,
  ],
})
export class AppBrowserModule {
  constructor(titleService: Title, router: Router, langService: LangService) {
    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        titleService.setTitle(getPageData(event.url, langService.lang).title);
      }
    });
  }
}
