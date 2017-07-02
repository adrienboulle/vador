import { Component } from '@angular/core';

@Component({
  selector: 'home',
  template: `
    <h1>{{'home_h1' | i18n}}</h1>
  `,
})
export class HomeComponent {}
