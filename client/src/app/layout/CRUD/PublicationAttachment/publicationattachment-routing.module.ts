import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicationAttachmentComponent } from './publicationattachment.component';

const routes: Routes = [
   {
      path: '',
      component: PublicationAttachmentComponent
   }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class PublicationAttachmentRoutingModule {}
