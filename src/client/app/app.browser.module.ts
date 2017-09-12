import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { Router, Event, NavigationEnd } from '@angular/router';

import { CodemirrorModule } from 'ng2-codemirror';

import { AppModule } from './app.module';

import { AppComponent } from './app.component';

import { MetaHelper } from '../../server/tools/MetaHelper';

import { I18nService } from '../shared/services/i18n.service';

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    CodemirrorModule,
    BrowserModule.withServerTransition({
      appId: 'app',
    }),
    AppModule,
  ],
})
export class AppBrowserModule {
  constructor(titleService: Title, router: Router, i18nService: I18nService) {
    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        titleService.setTitle(i18nService.translate(MetaHelper.getPageData(event.url).title));
      }
    });
  }
}
