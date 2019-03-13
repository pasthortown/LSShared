import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PublicationRoutingModule } from './publication-routing.module';
import { PublicationComponent } from './publication.component';
import { PublicationService } from './../../../services/CRUD/publication.service';
import { environment } from 'src/environments/environment';
import { AuthorService } from './../../../services/CRUD/author.service';
import { PublicationTypeService } from './../../../services/CRUD/publicationtype.service';
import { InstitutionInternalDivitionService } from './../../../services/CRUD/institutioninternaldivition.service';
import { CKEditorModule } from 'ngx-ckeditor';

@NgModule({
   imports: [CommonModule,
             PublicationRoutingModule,
             CKEditorModule,
             FormsModule],
   declarations: [PublicationComponent],
   providers: [NgbModal,
               AuthorService,
               PublicationTypeService,
               InstitutionInternalDivitionService,
               PublicationService
               ]
})
export class PublicationModule {}