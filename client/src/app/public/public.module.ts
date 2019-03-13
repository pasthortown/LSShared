import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { PublicRoutingModule } from './public-routing.module';
import { PublicComponent } from './public.component';
import { InstitutionService } from './../services/CRUD/institution.service';
import { InstitutionLogoService } from './../services/CRUD/institutionlogo.service';
import { PublicationService } from './../services/CRUD/publication.service';
import { AuthorService } from './../services/CRUD/author.service';
import { PublicationTypeService } from './../services/CRUD/publicationtype.service';
import { InstitutionInternalDivitionService } from './../services/CRUD/institutioninternaldivition.service';
import { PublicationAttachmentService } from './../services/CRUD/publicationattachment.service';
import { DocumentSharingService } from './../services/negocio/DocumentSharing.service';
import { CKEditorModule } from 'ngx-ckeditor';
import { PublicationCommentService } from './../services/CRUD/publicationcomment.service';
import { HttpModule } from '@angular/http';

@NgModule({
    imports: [CommonModule, HttpModule, PublicRoutingModule, NgbCarouselModule, CKEditorModule],
    declarations: [PublicComponent],
    providers: [InstitutionService,
                InstitutionLogoService,
                AuthorService,
                PublicationTypeService,
                InstitutionInternalDivitionService,
                PublicationService,
                PublicationAttachmentService,
                PublicationCommentService,
                DocumentSharingService
            ]
})
export class PublicModule {}
