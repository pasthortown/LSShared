import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstitutionInternalRolComponent } from './institutioninternalrol.component';

const routes: Routes = [
   {
      path: '',
      component: InstitutionInternalRolComponent
   }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class InstitutionInternalRolRoutingModule {}
