import { Component } from '@angular/core';

@Component({
  selector: 'contact',
  template: `
    <h3>hello 1 {{text}}</h3>
    <h3 [innerText]="'hello 2 ' + text"></h3>
    <input [(ngModel)]="text">
  `,
})
export class ContactComponent {
  public text: string;

  constructor() {
    this.text = 'contact';
  }
}
