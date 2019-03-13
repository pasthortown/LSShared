import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PublicationTypeRoutingModule } from './publicationtype-routing.module';
import { PublicationTypeComponent } from './publicationtype.component';
import { PublicationTypeService } from './../../../services/CRUD/publicationtype.service';
import { environment } from 'src/environments/environment';
import { CKEditorModule } from 'ngx-ckeditor';

@NgModule({
   imports: [CommonModule,
             PublicationTypeRoutingModule,
             CKEditorModule,
             FormsModule],
   declarations: [PublicationTypeComponent],
   providers: [NgbModal,
               PublicationTypeService
               ]
})
export class PublicationTypeModule {}