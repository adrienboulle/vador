import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  template: `
    <button (click)="toggleHeading()">Toggle Heading</button>
    <h1 *ngIf="showHeading">Hello Angular</h1>
    
    <h3>List of Heroes</h3>
    <div *ngFor="let hero of heroes">{{hero}}</div>
  `
})
export class AppComponent {
  showHeading = true;
  heroes = ['Magneta', 'Bombasto', 'Magma', 'Tornado'];

  toggleHeading() {
    this.showHeading = !this.showHeading;
  }
}
