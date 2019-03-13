import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministrativeRolComponent } from './administrativerol.component';

const routes: Routes = [
   {
      path: '',
      component: AdministrativeRolComponent
   }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class AdministrativeRolRoutingModule {}
