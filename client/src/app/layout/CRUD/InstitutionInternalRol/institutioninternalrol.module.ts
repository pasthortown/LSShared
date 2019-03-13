import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InstitutionInternalRolRoutingModule } from './institutioninternalrol-routing.module';
import { InstitutionInternalRolComponent } from './institutioninternalrol.component';
import { InstitutionInternalRolService } from './../../../services/CRUD/institutioninternalrol.service';
import { environment } from 'src/environments/environment';
import { InstitutionService } from './../../../services/CRUD/institution.service';
import { CKEditorModule } from 'ngx-ckeditor';

@NgModule({
   imports: [CommonModule,
             InstitutionInternalRolRoutingModule,
             CKEditorModule,
             FormsModule],
   declarations: [InstitutionInternalRolComponent],
   providers: [NgbModal,
               InstitutionService,
               InstitutionInternalRolService
               ]
})
export class InstitutionInternalRolModule {}