import { Component, HostBinding } from '@angular/core';

declare let window: any;

@Component({
  selector: 'app',
  templateUrl: 'app.component.html',
})
export class AppComponent {
  @HostBinding('class.ssr')
  public get getClassSsr() {
    return window.isSsr === true;
  }
}
