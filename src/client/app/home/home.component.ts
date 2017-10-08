import { Component } from '@angular/core';
import { ScrollHelper } from '../../shared/tools/ScrollHelper';

declare let window: any;

@Component({
  selector: 'home',
  templateUrl: 'home.component.html',
})
export class HomeComponent {
  constructor() {
    // window.scroll = () => ScrollHelper.scrollTo({
    //   position: document.getElementById('toto'),
    // });
  }
}
