import { DocumentSharingService } from './../../services/negocio/DocumentSharing.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PublicationCommentService } from './../../services/CRUD/publicationcomment.service';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MyPublicationsRoutingModule } from './my-publications-routing.module';
import { MyPublicationsComponent } from './my-publications.component';
import { CKEditorModule } from 'ngx-ckeditor';
import { PublicationTypeService } from './../../services/CRUD/publicationtype.service';
import { PublicationService } from './../../services/CRUD/publication.service';
import { AuthorService } from './../../services/CRUD/author.service';
import { PublicationAttachmentService } from './../../services/CRUD/publicationattachment.service';

@NgModule({
  imports: [CommonModule, CKEditorModule, MyPublicationsRoutingModule],
  declarations: [MyPublicationsComponent],
  providers: [NgbModal,
    DocumentSharingService,
    PublicationCommentService,
    PublicationTypeService,
    PublicationService,
    PublicationAttachmentService,
    AuthorService
  ]
})
export class MyPublicationsModule {}
