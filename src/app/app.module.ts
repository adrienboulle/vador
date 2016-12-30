import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule}   from '@angular/forms';

import {AppComponent}  from './app.component';
import {NotifService} from './notif/notif.service';

@NgModule({
  imports: [
    FormsModule,
    BrowserModule,
  ],
  declarations: [
    AppComponent,
  ],
  bootstrap: [
    AppComponent,
  ],
  providers: [
    NotifService,
  ],
})
export class AppModule { }
