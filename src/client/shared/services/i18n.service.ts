import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { LocationStrategy } from '@angular/common';

import { TradsHelper } from '../tools/TradsHelper';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';

@Injectable()
export class I18nService {
  private _lang: string;
  private _defaultLang: 'fr';
  private _langs: string[] = ['fr', 'en'];
  private _currentRouteData: any;

  constructor(locationStrategy: LocationStrategy, router: Router, private _activatedRoute: ActivatedRoute) {
    const baseHref = locationStrategy.getBaseHref();

    if (baseHref === '/') {
      this._lang = 'fr';
    } else {
      this._lang = baseHref.split('/')[1];
    }

    router.events
    .filter(event => event instanceof NavigationEnd)
    .map(() => this._activatedRoute)
    .map(route => {
      while (route.firstChild) {
        route = route.firstChild;
      }

      return route;
    })
    .filter(route => route.outlet === 'primary')
    .mergeMap(route => route.data)
    .subscribe(data => this._currentRouteData = data);
  }

  public get lang(): string {
    return this._lang;
  }

  public get langs(): string[] {
    return this._langs;
  }

  public get defaultLang(): string {
    return this._defaultLang;
  }

  public translate(key: string): string {
    return TradsHelper.getTrads(this.lang)[key];
  }

  public getChangeLangUrl(lang: string): string {
    if (!this._currentRouteData || this.langs.indexOf(lang) === -1) {
      return;
    }

    return (lang !== 'fr' ? '/' + lang : '') + '/' + this._currentRouteData[lang];
  }
}
