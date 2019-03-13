import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountRolComponent } from './accountrol.component';

const routes: Routes = [
   {
      path: '',
      component: AccountRolComponent
   }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class AccountRolRoutingModule {}
