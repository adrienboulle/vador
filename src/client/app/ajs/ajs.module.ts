import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CodemirrorModule } from 'ng2-codemirror';
import { LocalStorageModule } from 'angular-2-local-storage';

import { SharedModule } from '../../shared/shared.module';

import { AjsComponent } from './ajs.component';

@NgModule({
  imports: [
    LocalStorageModule.withConfig({
      prefix: 'ajs',
      storageType: 'localStorage',
    }),
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
