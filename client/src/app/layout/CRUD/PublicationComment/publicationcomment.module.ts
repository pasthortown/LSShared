import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PublicationCommentRoutingModule } from './publicationcomment-routing.module';
import { PublicationCommentComponent } from './publicationcomment.component';
import { PublicationCommentService } from './../../../services/CRUD/publicationcomment.service';
import { environment } from 'src/environments/environment';
import { PublicationService } from './../../../services/CRUD/publication.service';
import { PersonService } from './../../../services/CRUD/person.service';
import { CKEditorModule } from 'ngx-ckeditor';

@NgModule({
   imports: [CommonModule,
             PublicationCommentRoutingModule,
             CKEditorModule,
             FormsModule],
   declarations: [PublicationCommentComponent],
   providers: [NgbModal,
               PublicationService,
               PersonService,
               PublicationCommentService
               ]
})
export class PublicationCommentModule {}