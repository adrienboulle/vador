import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';

import { SkillsComponent } from './skills.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: '', component: SkillsComponent, pathMatch: 'full'},
    ]),
  ],
  declarations: [
    SkillsComponent,
  ],
})
export class SkillsModule {}
