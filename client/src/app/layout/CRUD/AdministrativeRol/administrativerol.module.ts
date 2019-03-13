import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdministrativeRolRoutingModule } from './administrativerol-routing.module';
import { AdministrativeRolComponent } from './administrativerol.component';
import { AdministrativeRolService } from './../../../services/CRUD/administrativerol.service';
import { environment } from 'src/environments/environment';

@NgModule({
   imports: [CommonModule,
             AdministrativeRolRoutingModule,
             FormsModule],
   declarations: [AdministrativeRolComponent],
   providers: [NgbModal,
               AdministrativeRolService
               ]
})
export class AdministrativeRolModule {}