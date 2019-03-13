import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstitutionInternalRolAssignmentComponent } from './institutioninternalrolassignment.component';

const routes: Routes = [
   {
      path: '',
      component: InstitutionInternalRolAssignmentComponent
   }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class InstitutionInternalRolAssignmentRoutingModule {}
