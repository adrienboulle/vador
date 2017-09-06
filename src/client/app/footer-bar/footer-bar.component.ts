import { Component } from '@angular/core';

import { I18nService } from '../../shared/services/i18n.service';

declare let window: any;

@Component({
  selector: 'footer-bar',
  templateUrl: 'footer-bar.component.html',
})
export class FooterBarComponent {
  constructor(private _i18nService: I18nService) {}

  get lang(): string {
    return this._i18nService.lang;
  }

  public changeLang(lang: string) {
    this._i18nService.changeLang(lang);
  }
}
