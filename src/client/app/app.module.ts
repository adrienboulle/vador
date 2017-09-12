import { NgModule } from '@angular/core';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { RouterModule, Route } from '@angular/router';

import { ROUTES_DATA } from '../../shared/routes';

import { SharedModule } from '../shared/shared.module';

import { I18nService } from '../shared/services/i18n.service';

import { AppComponent } from './app.component';
import { Link, NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterBarComponent } from './footer-bar/footer-bar.component';

// KEEP-START-NODE_ENV:production
import {enableProdMode} from '@angular/core';
enableProdMode();
// KEEP-END

// KEEP-START-IS_MIN:true
export const ROUTES: Route[] = [
  { path: 'contact', loadChildren: './contact/contact.module#ContactModule', data: ROUTES_DATA.contact },
  { path: 'skills', loadChildren: './skills/skills.module#SkillsModule', data: ROUTES_DATA.skills },
  { path: 'competences', loadChildren: './skills/skills.module#SkillsModule', data: ROUTES_DATA.competences },
  { path: 'ajs', loadChildren: './ajs/ajs.module#AjsModule', data: ROUTES_DATA.ajs },
  { path: '', loadChildren: './home/home.module#HomeModule', data: ROUTES_DATA.void },
];
// KEEP-END

// KEEP-START-IS_MIN:false
// NGFACTORY-START-IS_AOT:true
import { HomeModuleNgFactory } from './home/home.module.ngfactory';
import { SkillsModuleNgFactory } from './skills/skills.module.ngfactory';
import { ContactModuleNgFactory } from './contact/contact.module.ngfactory';
import { AjsModuleNgFactory } from './ajs/ajs.module.ngfactory';

export function  getChildrenHome(): any {
  return Promise.resolve(HomeModuleNgFactory);
}

export function  getChildrenSkills(): any {
  return Promise.resolve(SkillsModuleNgFactory);
}

export function getChildrenContact(): any {
  return Promise.resolve(ContactModuleNgFactory);
}

export function  getChildrenAjs(): any {
  return Promise.resolve(AjsModuleNgFactory);
}

export const ROUTES: Route[] = [
  { path: 'contact', loadChildren: getChildrenContact, data: ROUTES_DATA.contact },
  { path: 'skills', loadChildren: getChildrenSkills, data: ROUTES_DATA.skills },
  { path: 'competences', loadChildren: getChildrenSkills, data: ROUTES_DATA.competences },
  { path: 'ajs', loadChildren: getChildrenAjs, data: ROUTES_DATA.ajs },
  { path: '', loadChildren: getChildrenHome, data: ROUTES_DATA.void },
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
    NavBarComponent,
    FooterBarComponent,
    Link,
  ],
})
export class AppModule {}
