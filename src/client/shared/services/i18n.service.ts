import { Injectable } from '@angular/core';
import { LocationStrategy } from '@angular/common';

import { TradsHelper } from '../tools/TradsHelper';

@Injectable()
export class I18nService {
  private _lang: string;

  constructor(locationStrategy: LocationStrategy) {
    const baseHref = locationStrategy.getBaseHref();

    if (baseHref === '/') {
      this._lang = 'fr';
    } else {
      this._lang = baseHref.split('/')[1];
    }
  }

  public get lang(): string {
    return this._lang;
  }

  public translate(key: string): string {
    return TradsHelper.getTrads(this.lang)[key];
  }
}
