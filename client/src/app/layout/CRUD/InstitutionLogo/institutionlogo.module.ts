import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InstitutionLogoRoutingModule } from './institutionlogo-routing.module';
import { InstitutionLogoComponent } from './institutionlogo.component';
import { InstitutionLogoService } from './../../../services/CRUD/institutionlogo.service';
import { environment } from 'src/environments/environment';
import { InstitutionService } from './../../../services/CRUD/institution.service';

@NgModule({
   imports: [CommonModule,
             InstitutionLogoRoutingModule,
             FormsModule],
   declarations: [InstitutionLogoComponent],
   providers: [NgbModal,
               InstitutionService,
               InstitutionLogoService
               ]
})
export class InstitutionLogoModule {}