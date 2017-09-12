import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CodemirrorModule } from 'ng2-codemirror';

import { SharedModule } from '../../shared/shared.module';

import { AjsComponent } from './ajs.component';

@NgModule({
  imports: [
    SharedModule,
    CodemirrorModule,
    RouterModule.forChild([
      { path: '', component: AjsComponent, pathMatch: 'full'},
    ]),
  ],
  declarations: [
    AjsComponent,
  ],
})
export class AjsModule {}
