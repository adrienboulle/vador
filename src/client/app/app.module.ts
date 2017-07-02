import { NgModule } from '@angular/core';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { RouterModule, Route } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { I18nService } from '../shared/services/i18n.service';

import { AppComponent } from './app.component';

export const ROUTES: Route[] = [
  { path: 'contact', loadChildren: './contact/contact.module#ContactModule' },
  { path: '', loadChildren: './home/home.module#HomeModule' },
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forRoot(ROUTES, { initialNavigation: 'enabled' }),
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy,
    },
    I18nService,
  ],
  declarations: [
    AppComponent,
  ],
})
export class AppModule {}
