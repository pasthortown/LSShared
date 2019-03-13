import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PublicationAttachmentRoutingModule } from './publicationattachment-routing.module';
import { PublicationAttachmentComponent } from './publicationattachment.component';
import { PublicationAttachmentService } from './../../../services/CRUD/publicationattachment.service';
import { environment } from 'src/environments/environment';
import { PublicationService } from './../../../services/CRUD/publication.service';

@NgModule({
   imports: [CommonModule,
             PublicationAttachmentRoutingModule,
             FormsModule],
   declarations: [PublicationAttachmentComponent],
   providers: [NgbModal,
               PublicationService,
               PublicationAttachmentService
               ]
})
export class PublicationAttachmentModule {}