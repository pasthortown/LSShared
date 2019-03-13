import { InstitutionInternalDivitionService } from './../../services/CRUD/institutioninternaldivition.service';
import { DocumentSharingService } from 'src/app/services/negocio/DocumentSharing.service';
import { FormsModule } from '@angular/forms';
import { InstitutionService } from './../../services/CRUD/institution.service';
import { InstitutionLogoService } from './../../services/CRUD/institutionlogo.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { InstitutionAdminRoutingModule } from './institution-admin-routing.module';
import { InstitutionAdminComponent } from './institution-admin.component';
import { AgmCoreModule } from '@agm/core';
import { environment } from 'src/environments/environment';
import { InstitutionProfileComponent } from './components/institution-profile/institution-profile.component';
import { InstitutionInternalDivitionComponent } from './components/institution-internal-divition/institution-internal-divition.component';
import { PublishersComponent } from './components/publishers/publishers.component';
import { DepartmentComponent } from './components/institution-internal-divition/components/department/department.component';
import { RolsComponent } from './components/institution-internal-divition/components/rols/rols.component';
import { InstitutionInternalRolService } from './../../services/CRUD/institutioninternalrol.service';
import { CKEditorModule } from 'ngx-ckeditor';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InstitutionInternalRolAssignmentService } from './../../services/CRUD/institutioninternalrolassignment.service';

@NgModule({
  imports: [CommonModule,
    CKEditorModule,
    InstitutionAdminRoutingModule,
    NgbModule,
    FormsModule,
    AgmCoreModule.forRoot({apiKey: environment.gmapapiKey}),
  ],
  declarations: [InstitutionAdminComponent,
    InstitutionProfileComponent,
    InstitutionInternalDivitionComponent,
    PublishersComponent,
    DepartmentComponent,
    RolsComponent],
  providers: [NgbModal,
    InstitutionService,
    InstitutionInternalRolAssignmentService,
    InstitutionInternalDivitionService,
    InstitutionLogoService,
    InstitutionInternalRolService,
    DocumentSharingService]
})
export class InstitutionAdminModule {}
