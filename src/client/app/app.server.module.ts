import { NgModule, ApplicationRef, RendererFactory2 } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ServerModule, ɵServerRendererFactory2 } from '@angular/platform-server';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/first';

import { AppModule } from './app.module';
import { MetaService } from '../shared/services/meta.service';
import { AppComponent } from './app.component';

declare let window: any;

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({
      appId: 'app',
    }),
    ServerModule,
    AppModule,
  ],
  providers: [
    MetaService,
    { provide: RendererFactory2, useClass: ɵServerRendererFactory2 },
  ],
})
export class AppServerModule {
  constructor(appRef: ApplicationRef, metaService: MetaService) {
    appRef.isStable
    .filter((isStable: boolean) => isStable)
    .first()
    .subscribe(() => {
      if (window.meta) {
        metaService.setMeta(window.meta);
      }
    });
  }
}
