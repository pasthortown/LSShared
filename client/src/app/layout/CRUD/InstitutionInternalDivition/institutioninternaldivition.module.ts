import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InstitutionInternalDivitionRoutingModule } from './institutioninternaldivition-routing.module';
import { InstitutionInternalDivitionComponent } from './institutioninternaldivition.component';
import { InstitutionInternalDivitionService } from './../../../services/CRUD/institutioninternaldivition.service';
import { environment } from 'src/environments/environment';
import { InstitutionService } from './../../../services/CRUD/institution.service';

@NgModule({
   imports: [CommonModule,
             InstitutionInternalDivitionRoutingModule,
             FormsModule],
   declarations: [InstitutionInternalDivitionComponent],
   providers: [NgbModal,
               InstitutionService,
               InstitutionInternalDivitionService
               ]
})
export class InstitutionInternalDivitionModule {}