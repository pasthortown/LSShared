import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InstitutionInternalRolAssignmentRoutingModule } from './institutioninternalrolassignment-routing.module';
import { InstitutionInternalRolAssignmentComponent } from './institutioninternalrolassignment.component';
import { InstitutionInternalRolAssignmentService } from './../../../services/CRUD/institutioninternalrolassignment.service';
import { environment } from 'src/environments/environment';
import { InstitutionInternalRolService } from './../../../services/CRUD/institutioninternalrol.service';
import { PersonService } from './../../../services/CRUD/person.service';

@NgModule({
   imports: [CommonModule,
             InstitutionInternalRolAssignmentRoutingModule,
             FormsModule],
   declarations: [InstitutionInternalRolAssignmentComponent],
   providers: [NgbModal,
               InstitutionInternalRolService,
               PersonService,
               InstitutionInternalRolAssignmentService
               ]
})
export class InstitutionInternalRolAssignmentModule {}