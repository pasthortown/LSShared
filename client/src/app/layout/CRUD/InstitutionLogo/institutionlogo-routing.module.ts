import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstitutionLogoComponent } from './institutionlogo.component';

const routes: Routes = [
   {
      path: '',
      component: InstitutionLogoComponent
   }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class InstitutionLogoRoutingModule {}
