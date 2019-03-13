import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstitutionInternalDivitionComponent } from './institutioninternaldivition.component';

const routes: Routes = [
   {
      path: '',
      component: InstitutionInternalDivitionComponent
   }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class InstitutionInternalDivitionRoutingModule {}
