import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicationCommentComponent } from './publicationcomment.component';

const routes: Routes = [
   {
      path: '',
      component: PublicationCommentComponent
   }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class PublicationCommentRoutingModule {}
