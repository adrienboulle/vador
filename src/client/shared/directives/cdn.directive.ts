import { Directive, Inject, ElementRef, Renderer2 } from '@angular/core';

import { APP_CONFIG, AppConfig } from '../config/config';

@Directive({
  selector: '[cdn]',
})
export class Cdn {
  constructor(@Inject(APP_CONFIG) conf: AppConfig, el: ElementRef, renderer: Renderer2) {
    el.nativeElement.setAttribute('src', conf.getCdn() + el.nativeElement.getAttribute('src'));
  }
}
