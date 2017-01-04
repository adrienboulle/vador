import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {NotifComponent} from './notif/notif.component';
import {NotifService} from './notif/notif.service';
import {KixLikeComponent} from './kikLike/kix-like.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: 'notif',
        component: NotifComponent,
      },
      {
        path: 'kix-like',
        component: KixLikeComponent,
      },
      {
        path: '**',
        redirectTo: '/notif',
        pathMatch: 'full',
      },
    ]),
    FormsModule,
    BrowserModule,
  ],
  declarations: [
    HeaderComponent,
    NotifComponent,
    KixLikeComponent,
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
