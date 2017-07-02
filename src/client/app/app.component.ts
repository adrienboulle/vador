import { Component } from '@angular/core';

@Component({
  selector: 'app',
  template: `
    <h1>Universal Demo</h1>
    <a routerLink="/">Home</a>
    <a routerLink="/contact">Contact</a>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {}
