import {Component} from '@angular/core';
import {NotifService} from './notif/notif.service';

@Component({
  moduleId: module.id,
  selector: 'app',
  template: `
    <header></header>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {
  constructor() {}
}
