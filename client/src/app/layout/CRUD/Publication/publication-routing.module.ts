import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicationComponent } from './publication.component';

const routes: Routes = [
   {
      path: '',
      component: PublicationComponent
   }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class PublicationRoutingModule {}
