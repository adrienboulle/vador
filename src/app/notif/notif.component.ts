import {Component} from '@angular/core';
import {NotifService} from './notif.service';

@Component({
  moduleId: module.id,
  selector: 'notif',
  templateUrl: 'notif.component.html',
})
export class NotifComponent {
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
