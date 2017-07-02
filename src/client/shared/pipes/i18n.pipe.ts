import { Pipe, PipeTransform } from '@angular/core';

import { I18nService } from '../services/i18n.service';

@Pipe({
  name: 'i18n',
})
export class I18n implements PipeTransform {
  constructor(private _i18nService: I18nService) {}

  public transform(value: string): any {
    return this._i18nService.translate(value) || value;
  }
}
