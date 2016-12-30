import {Component} from '@angular/core';
import {NotifService} from './notif/notif.service';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.component.html',
})
export class AppComponent {
  public text: string = 'My notification';
  public type: string;
  public types: any[];

  constructor(private notifService: NotifService) {
    this.types = this.notifService.types;
    this.type = this.types[0];
  }

  public showNotif() {
    this.notifService.show(this.text, this.type);
  }
}
