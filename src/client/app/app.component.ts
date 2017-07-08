import { Component, HostBinding, HostListener } from '@angular/core';

declare let window: any;

@Component({
  selector: 'app',
  templateUrl: 'app.component.html',
  host: {
    '(window:scroll)': 'onScroll($event)',
  }
})
export class AppComponent {
  @HostBinding('class.ssr')
  public get getClassSsr() {
    return window.isSsr === true;
  }

  public onScroll(event: Event): void {
    console.log(event);
  }
}
