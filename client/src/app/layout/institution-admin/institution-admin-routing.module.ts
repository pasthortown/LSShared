import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InstitutionAdminComponent } from './institution-admin.component';

const routes: Routes = [
  {
    path: '',
    component: InstitutionAdminComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstitutionAdminRoutingModule {}
