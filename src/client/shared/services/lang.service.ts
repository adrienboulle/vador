import { Injectable } from '@angular/core';
import { LocationStrategy } from '@angular/common';

@Injectable()
export class LangService {
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
}
