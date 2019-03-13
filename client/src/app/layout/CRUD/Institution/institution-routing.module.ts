import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstitutionComponent } from './institution.component';

const routes: Routes = [
   {
      path: '',
      component: InstitutionComponent
   }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class InstitutionRoutingModule {}
