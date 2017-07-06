import { NgModule, Type } from '@angular/core';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { RouterModule, Route } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { I18nService } from '../shared/services/i18n.service';

import { AppComponent } from './app.component';

// KEEP-START-NODE_ENV:production
import {enableProdMode} from '@angular/core';
enableProdMode();
// KEEP-END

// KEEP-START-IS_MIN:true
export const ROUTES: Route[] = [
  { path: 'contact', loadChildren: './contact/contact.module#ContactModule' },
  { path: '', loadChildren: './home/home.module#HomeModule' },
];
// KEEP-END

// KEEP-START-IS_MIN:false
// NGFACTORY-START-IS_AOT:true
import { ContactModuleNgFactory } from './contact/contact.module.ngfactory';
import { HomeModuleNgFactory } from './home/home.module.ngfactory';

export function getChildrenContact(): any {
  return Promise.resolve(ContactModuleNgFactory);
}

export function  getChildrenHome(): any {
  return Promise.resolve(HomeModuleNgFactory);
}

export const ROUTES: Route[] = [
  { path: 'contact', loadChildren: getChildrenContact },
  { path: '', loadChildren: getChildrenHome },
];
// KEEP-END
// NGFACTORY-END

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
