import {Component} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.component.html',
})
export class AppComponent {
  public showHeading: boolean = true;
  public heroes: string[] = ['Magneta', 'Bombasto', 'Magma', 'Tornado'];

  public toggleHeading() {
    this.showHeading = !this.showHeading;
  }
}
