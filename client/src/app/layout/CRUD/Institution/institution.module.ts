import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InstitutionRoutingModule } from './institution-routing.module';
import { InstitutionComponent } from './institution.component';
import { InstitutionService } from './../../../services/CRUD/institution.service';
import { environment } from 'src/environments/environment';
import { AgmCoreModule } from '@agm/core';

@NgModule({
   imports: [CommonModule,
             InstitutionRoutingModule,
             AgmCoreModule.forRoot({apiKey: environment.gmapapiKey}),
             FormsModule],
   declarations: [InstitutionComponent],
   providers: [NgbModal,
               InstitutionService
               ]
})
export class InstitutionModule {}